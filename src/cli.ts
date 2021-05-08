#!/usr/bin/env node

import "./config/mongo";
import Table from "cli-table";
import program from "commander";

import packageJson from "../package.json";
import filterSameEnterpriseStocks from "./functions/filter-same-enterprise-stocks";
import getLastImport from "./functions/get-last-import";
import importStocks from "./functions/import-stocks";
import rankingStrategy from "./strategies";
import StockWithScore from "./types/stock-with-score";

function showStocksTable(stocks: StockWithScore[]) {
  const table = new Table({
    head: ["code", "score", "position"],
    colWidths: [10, 10, 10],
  });

  stocks.map((stock, index) => table.push([stock.code, stock.score, index]));
  console.log(table.toString());
}

program.version(packageJson.version);

program
  .command("import")
  .description("Import stocks and save on database")
  .action(async () => {
    await importStocks();

    process.exit();
  });

program
  .command("list")
  .description("Get stocks with default ranking options")
  .option("-s [s]", "Chose strategy to run")
  .option("-n [n]", "Number of stocks listed")
  .option("-f [f]", "Filter stocks of the same enterprise")
  .action(async ({ n, f, s }) => {
    try {
      const lastImport = await getLastImport();

      if (!lastImport) {
        return;
      }

      const { stocks } = lastImport;

      let sortedStocks = rankingStrategy(stocks, s);

      if (f) {
        sortedStocks = filterSameEnterpriseStocks(sortedStocks);
      }

      if (n) {
        sortedStocks = sortedStocks.slice(0, n);
      }

      showStocksTable(sortedStocks);
    } catch (err) {
      console.error("Error: ", err.message);
    }
    process.exit();
  });
program.parse(process.argv);
