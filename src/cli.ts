#!/usr/bin/env node

import "./config/mongo";
import Table from "cli-table";
import program from "commander";

import packageJson from "../package.json";
import filterStocks from "./functions/filter-stocks";
import getLastImport from "./functions/get-last-import";
import importStocks from "./functions/import-stocks";
import StockWithRankingAndScore from "./types/stock-with-ranking-and-score";

export function showStocksTable(stocks: StockWithRankingAndScore[]) {
  const table = new Table({
    head: ["code", "position", "score"],
    colWidths: [10, 10, 10],
  });

  stocks.map((stock) =>
    table.push([stock.code, stock.score_position, stock.score])
  );
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
  .action(async () => {
    const lastImport = await getLastImport();

    if (!lastImport) {
      return;
    }

    const { stocks } = lastImport;

    filterStocks(stocks, {
      liquidez_media_diaria: {
        min: 200000,
      },
      enterprise_value_por_ebit: {
        min: 0,
        max: 6,
      },
    });
    // showStocksTable(stocks);

    process.exit();
  });
program.parse(process.argv);
