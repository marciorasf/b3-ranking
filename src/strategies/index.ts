import calculateScores from "../functions/calculate-scores";
import filterStocks from "../functions/filter-stocks";
import sortStocksWithScores from "../functions/sort-stocks-with-scores";
import Stock from "../types/stock";
import { StrategyName } from "../types/strategy";
import getStrategyConfig from "./get-strategy-config";

export default function runStrategy(stocks: Stock[], strategy: StrategyName = "marciorasf") {
  const strategyConfig = getStrategyConfig(strategy);

  if (!strategyConfig) {
    throw Error("Strategy doesn't exist");
  }

  const { filters, rankingWeights } = strategyConfig;

  const filteredStocks = filterStocks(stocks, filters);

  const stocksWithScores = calculateScores(filteredStocks, rankingWeights);

  const sortedStocks = sortStocksWithScores(stocksWithScores);

  return sortedStocks;
}
