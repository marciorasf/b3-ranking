#!/usr/bin/env node

import "./config/mongo";
import Table from "cli-table";
import program from "commander";

import packageJson from "../package.json";
import getStocksWithDefaultRankingOptions from "./services/getStocksWithDefaultRankingOptions";
import importStocks from "./services/importStocks";
import StockWithRankingAndScore from "./types/stock-with-ranking-and-score";

function showStocksTable(stocks: StockWithRankingAndScore[]) {
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
  .command("default-list")
  .description("Get stocks with default ranking options")
  .option("-n [n]", "Number of stocks listed")
  .option("-f [f]", "Filter stocks of the same enterprise")
  .action(async ({ n, f: filter }) => {
    let stocks = await getStocksWithDefaultRankingOptions(filter);

    if (!stocks) {
      return;
    }

    if (n) {
      stocks = stocks.slice(0, n);
    }
    showStocksTable(stocks);

    process.exit();
  });

program
  .command("find [codes]")
  .description(
    "Get stocks with default ranking options. Stocks between quotes separatted by commas"
  )
  .action(async (rawCodes) => {
    const codes = rawCodes.replace(/\s*/g, "").split(",");
    const stocks = await getStocksWithDefaultRankingOptions();

    if (!stocks) {
      return;
    }

    let stocksFound = codes.map((code: any) => {
      return stocks.find(
        (stock) => stock.code.toLowerCase() === code.toLowerCase()
      );
    });

    stocksFound = stocksFound.filter((stock: any) => stock);

    if (stocksFound) {
      showStocksTable(stocksFound);
    } else {
      console.log("Stocks not found");
    }

    process.exit();
  });

program.parse(process.argv);
