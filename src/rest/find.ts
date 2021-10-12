import { Request, Response } from "express";

import filterSameEnterpriseStocks from "@domain/functions/filter-same-enterprise-stocks";
import getLastImport from "@domain/functions/get-last-import";
import runStrategyRanking from "@domain/functions/run-strategy-ranking";
import { StockWithPosition } from "@domain/protocols/find-stocks";
import { StrategyName } from "@domain/protocols/strategy";

export default async function find(req: Request, res: Response): Promise<void> {
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

  let sortedStocks = runStrategyRanking(stocks, options.strategy);

  sortedStocks = filterSameEnterpriseStocks(sortedStocks);

  const stocksWithPosition = stockCodes.map((code: string) => {
    const position = sortedStocks.findIndex((stock) => stock.code.slice(0, 4) === code);
    return { code, position };
  }) as StockWithPosition[];

  const sortedStocksWithPositions = stocksWithPosition.sort(
    (stockA, stockB) => stockA.position - stockB.position
  );

  res.status(200).json(sortedStocksWithPositions);
}
