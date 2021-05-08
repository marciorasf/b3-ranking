#!/usr/bin/env node

import "./config/mongo";
import Table from "cli-table";
import program from "commander";

import packageJson from "../package.json";
import getLastImport from "./services/get-last-import";
import importStocks from "./services/import-stocks";
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
  .action(async ({ n, f: filter }) => {
    const lastImport = await getLastImport();

    if (!lastImport) {
      console.log(filter);
      return;
    }

    let { stocks } = lastImport;

    if (n) {
      stocks = stocks.slice(0, n);
    }
    console.log(stocks);
    // showStocksTable(stocks);

    process.exit();
  });
program.parse(process.argv);
