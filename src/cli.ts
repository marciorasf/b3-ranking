#!/usr/bin/env node

import "./config/mongo";
import Table from "cli-table";
import program from "commander";

import packageJson from "../package.json";
import filterSameEnterpriseStocks from "./functions/filter-same-enterprise-stocks";
import getLastImport from "./functions/get-last-import";
import importStocks from "./functions/import-stocks";
import marciorasf from "./strategies/marciorasf";
import StockWithScore from "./types/stock-with-score";

function showStocksTable(stocks: StockWithScore[]) {
  const table = new Table({
    head: ["code", "score"],
    colWidths: [10, 10],
  });

  stocks.map((stock) => table.push([stock.code, stock.score]));
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
  .option("-n [n]", "Number of stocks listed")
  .option("-f [f]", "Filter stocks of the same enterprise")
  .action(async ({ n, f }) => {
    const lastImport = await getLastImport();

    if (!lastImport) {
      return;
    }

    const { stocks } = lastImport;

    let sortedStocks = marciorasf(stocks);

    if (f) {
      sortedStocks = filterSameEnterpriseStocks(sortedStocks);
    }

    if (n) {
      sortedStocks = sortedStocks.slice(0, n);
    }

    showStocksTable(sortedStocks);

    process.exit();
  });
program.parse(process.argv);
