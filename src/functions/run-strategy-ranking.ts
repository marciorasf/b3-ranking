import getStrategyConfig from "../strategies/get-strategy-config";
import Stock from "../types/stock";
import { StrategyName } from "../types/strategy";
import calculateScores from "./calculate-scores";
import filterStocks from "./filter-stocks";
import sortStocksWithScores from "./sort-stocks-with-scores";

export default function runStrategy(
  stocks: Stock[],
  strategy: StrategyName = "marciorasf",
  useFilters = true
) {
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
