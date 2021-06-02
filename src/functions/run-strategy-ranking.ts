import calculateScores from "@functions/calculate-scores";
import filterStocks from "@functions/filter-stocks";
import sortStocksWithScores from "@functions/sort-stocks-with-scores";
import Stock from "@protocols/stock";
import { StrategyName } from "@protocols/strategy";
import getStrategyConfig from "@strategies/get-strategy-config";

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
