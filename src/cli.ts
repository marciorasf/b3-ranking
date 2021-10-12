#!/usr/bin/env node
import Table from "cli-table";
import program from "commander";

import "@/mongo";
import filterSameEnterpriseStocks from "@/domain/functions/filter-same-enterprise-stocks";
import getLastImport from "@/domain/functions/get-last-import";
import importStocks from "@/domain/functions/import-stocks";
import runRankingStrategy from "@/domain/functions/run-strategy-ranking";
import { StockWithPosition } from "@/domain/protocols/find-stocks";
import StockWithScore from "@/domain/protocols/stock-with-score";

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

program
  .command("import")
  .description("Import stocks and save on database")
  .action(async () => {
    await importStocks();

    process.exit();
  });

program
  .command("errors")
  .description("Display stocks that couldn't be imported")
  .action(async () => {
    const lastImport = await getLastImport();

    if (!lastImport) {
      return;
    }

    const errors = lastImport.importErrors;

    console.log(errors);

    process.exit();
  });

program
  .command("list")
  .description("Get filtered and rank stocks")
  .option(
    "-s [s]",
    "Chose strategy to run. Available strategies: custom, marciorasf, bazin, onlyEbit"
  )
  .option("-n [n]", "Number of stocks listed")
  .option("-f [f]", "Filter stocks of the same enterprise")
  .action(async ({ n: numberOfStocks, f: filterStocks, s: strategy }) => {
    try {
      const lastImport = await getLastImport();

      if (!lastImport) {
        return;
      }

      const { stocks } = lastImport;

      let sortedStocks = runRankingStrategy(stocks, strategy || "custom");

      if (filterStocks) {
        sortedStocks = filterSameEnterpriseStocks(sortedStocks);
      }

      if (numberOfStocks) {
        sortedStocks = sortedStocks.slice(0, numberOfStocks);
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
  .option("-s [s]", "Chose strategy to run. Available strategies: marciorasf, bazin, onlyEbit")
  .option("--stocks [s]", "Stocks")
  .action(async ({ stocks: stocksToFind, s: strategy }) => {
    try {
      const stockCodes = stocksToFind
        .split(",")
        .map((stock: string) => stock.trim().toUpperCase().slice(0, 4));

      const lastImport = await getLastImport();

      if (!lastImport) {
        return;
      }

      const { stocks } = lastImport;

      let sortedStocks = runRankingStrategy(stocks, strategy || "custom");

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
