import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import "@/mongo";
import "@/cron";
import { PORT } from "@config/env";
import filterSameEnterpriseStocks from "@domain/functions/filter-same-enterprise-stocks";
import getLastImport from "@domain/functions/get-last-import";
import runRankingStrategy from "@domain/functions/run-strategy-ranking";
import { StockWithPosition } from "@domain/protocols/find-stocks";
import { StrategyName } from "@domain/protocols/strategy";
import importStocks from "@domain/functions/import-stocks";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (_req, res) {
  res.send("<h2>Hello from B3-Magical-Formula</h2>");
});

app.post("/import", function (_req, res) {
  importStocks();
  res.sendStatus(204);
});

app.get("/last-import", async function (_req, res) {
  const lastImport = await getLastImport();
  res.status(200).json(lastImport);
});

app.post("/ranking", async function (req, res) {
  type Options = {
    strategy: StrategyName;
    filterStocks: boolean;
    numberOfStocks?: number;
  };
  const options: Options = {
    strategy: req.body.strategy || "greenblat",
    filterStocks: req.body.filter_same_enterprise_stocks || false,
    numberOfStocks: req.body.number_of_stocks,
  };

  const lastImport = await getLastImport();
  if (!lastImport) {
    return;
  }
  const { stocks } = lastImport;

  let sortedStocks = runRankingStrategy(stocks, options.strategy);

  if (options.filterStocks) {
    sortedStocks = filterSameEnterpriseStocks(sortedStocks);
  }

  if (options.numberOfStocks) {
    sortedStocks = sortedStocks.slice(0, options.numberOfStocks);
  }

  const rankedStocks = sortedStocks.map((stock, index) => ({
    code: stock.code,
    position: index + 1,
    score: stock.score,
  }));

  res.status(200).json(rankedStocks);
});

app.post("/find", async function (req, res) {
  type Options = {
    strategy: StrategyName;
  };
  const options: Options = {
    strategy: req.body.strategy || "greenblat",
  };
  const stockCodes = req.body.stocks;

  const lastImport = await getLastImport();
  if (!lastImport) {
    return;
  }
  const { stocks } = lastImport;

  let sortedStocks = runRankingStrategy(stocks, options.strategy);

  sortedStocks = filterSameEnterpriseStocks(sortedStocks);

  const stocksWithPosition = stockCodes.map((code: string) => {
    const position = sortedStocks.findIndex((stock) => stock.code.slice(0, 4) === code);
    return { code, position };
  }) as StockWithPosition[];

  const sortedStocksWithPositions = stocksWithPosition.sort(
    (stockA, stockB) => stockA.position - stockB.position
  );

  res.status(200).json(sortedStocksWithPositions);
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
