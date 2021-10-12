import calculateScores from "@domain/functions/calculate-scores";
import filterStocks from "@domain/functions/filter-stocks";
import sortStocksWithScores from "@domain/functions/sort-stocks-with-scores";
import Stock from "@domain/protocols/stock";
import { StrategyName } from "@domain/protocols/strategy";
import getStrategyConfig from "@domain/strategies/get-strategy-config";

export default function runStrategy(stocks: Stock[], strategy: StrategyName, useFilters = true) {
  const strategyConfig = getStrategyConfig(strategy);

  if (!strategyConfig) {
    throw Error("Strategy doesn't exist");
  }

  const { filters, rankingWeights } = strategyConfig;

  let filteredStocks = stocks;

  if (useFilters) {
    filteredStocks = filterStocks(stocks, filters);
  }

  const stocksWithScores = calculateScores(filteredStocks, rankingWeights);

  const sortedStocks = sortStocksWithScores(stocksWithScores);

  return sortedStocks;
}
