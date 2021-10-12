import { Request, Response } from "express";

import filterSameEnterpriseStocks from "@domain/functions/filter-same-enterprise-stocks";
import getLastImport from "@domain/functions/get-last-import";
import runStrategyRanking from "@domain/functions/run-strategy-ranking";
import { StrategyName } from "@domain/protocols/strategy";

export default async function ranking(req: Request, res: Response): Promise<void> {
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

  let sortedStocks = runStrategyRanking(stocks, options.strategy);

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
}
