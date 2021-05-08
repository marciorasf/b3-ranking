#!/usr/bin/env node

import "./config/mongo";
import Table from "cli-table";
import program from "commander";

import packageJson from "../package.json";
import filterSameEnterpriseStocks from "./functions/filter-same-enterprise-stocks";
import getLastImport from "./functions/get-last-import";
import importStocks from "./functions/import-stocks";
import runRankingStrategy from "./functions/run-strategy-ranking";
import { StockWithPosition } from "./types/find-stocks";
import StockWithScore from "./types/stock-with-score";

function showListStocksTable(stocks: StockWithScore[]) {
  const table = new Table({
    head: ["code", "score", "position"],
    colWidths: [10, 10, 10],
  });

  stocks.map((stock, index) => table.push([stock.code, stock.score, index]));
  console.log(table.toString());
}

function showFindStocksTable(stocks: StockWithPosition[]) {
  const table = new Table({
    head: ["code", "position"],
    colWidths: [10, 10],
  });

  stocks.map((stock) => table.push([stock.code, stock.position]));
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
  .description("Get filtered and ranked stocks")
  .option("-s [s]", "Chose strategy to run. Available strategies: marciorasf, bazin")
  .option("-n [n]", "Number of stocks listed")
  .option("-f [f]", "Filter stocks of the same enterprise")
  .action(async ({ n, f, s }) => {
    try {
      const lastImport = await getLastImport();

      if (!lastImport) {
        return;
      }

      const { stocks } = lastImport;

      let sortedStocks = runRankingStrategy(stocks, s);

      if (f) {
        sortedStocks = filterSameEnterpriseStocks(sortedStocks);
      }

      if (n) {
        sortedStocks = sortedStocks.slice(0, n);
      }

      showListStocksTable(sortedStocks);
    } catch (err) {
      console.error("Error: ", err.message);
    }
    process.exit();
  });

program
  .command("find")
  .description("Get stocks with default ranking options")
  .option("-s [s]", "Chose strategy to run. Available strategies: marciorasf, bazin")
  .option("--stocks [s]", "Stocks")
  .action(async ({ stocks: stocksToFind, s }) => {
    try {
      const stockCodes = stocksToFind
        .split(",")
        .map((stock: string) => stock.trim().toUpperCase().slice(0, 4));

      const lastImport = await getLastImport();

      if (!lastImport) {
        return;
      }

      const { stocks } = lastImport;

      let sortedStocks = runRankingStrategy(stocks, s);

      sortedStocks = filterSameEnterpriseStocks(sortedStocks);

      const stocksWithPosition = stockCodes.map((code: string) => {
        const position = sortedStocks.findIndex((stock) => stock.code.slice(0, 4) === code);
        return { code, position };
      }) as StockWithPosition[];

      const sortedStocksWithPositions = stocksWithPosition.sort(
        (stockA, stockB) => stockA.position - stockB.position
      );

      showFindStocksTable(sortedStocksWithPositions);
    } catch (err) {
      console.error("Error: ", err.message);
    }
    process.exit();
  });
program.parse(process.argv);
