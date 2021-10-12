/* eslint-disable no-param-reassign */
import calculateRanking from "@domain/functions/calculate-ranking";
import filterStocks, { Filters } from "@domain/functions/filter-stocks";
import Stock from "@domain/protocols/stock";
import { Indicator } from "@domain/protocols/stock-indicators";
import StockWithScore from "@domain/protocols/stock-with-score";

export type IndicatorsWeights = Partial<Record<Indicator, number>>;

export default function calculateScores(stocks: Stock[], indicatorsWeights: IndicatorsWeights) {
  const filters: Filters = {};

  Object.keys(indicatorsWeights).forEach((key) => {
    filters[key as Indicator] = {
      exists: true,
    };
  });

  const filteredStocks = filterStocks(stocks, filters);

  const indicators = Object.keys(indicatorsWeights) as Indicator[];

  const stocksWithRankings = calculateRanking(filteredStocks, indicators);

  const stocksWithScores = stocksWithRankings.map((stock) => {
    let score = 0;

    Object.entries(indicatorsWeights).forEach((entry) => {
      const indicator = entry[0] as Indicator;
      const weight = entry[1] as number;
      const indicatorValue = stock.indicatorsRanking[indicator] as number;

      score += indicatorValue * weight;
    });

    return {
      ...stock,
      score,
    };
  }) as StockWithScore[];

  return stocksWithScores;
}
