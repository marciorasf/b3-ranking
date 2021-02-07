/* eslint-disable no-param-reassign */
import { Indicator } from "../types/stock-indicators";
import StockWithRanking from "../types/stock-with-ranking";
import StockWithRankingAndScore from "../types/stock-with-score";

const weightsReducer = (accumulator: number, currentItem: any) =>
  accumulator + currentItem.weight;

const scoresReducer = (accumulator: number, currentScore: number) =>
  accumulator + currentScore;

interface IndicatorAndWeight {
  indicator: Indicator;
  weight: number;
}

interface Options {
  filterSameEnterpriseStocks?: boolean;
}

export default function calculateScoresAndSort(
  stocks: StockWithRanking[],
  indicatorsAndWeights: IndicatorAndWeight[],
  options: Options
) {
  let stocksCopy = stocks.slice() as StockWithRankingAndScore[];
  const weightsSum = indicatorsAndWeights.reduce(weightsReducer, 0);

  stocksCopy.forEach((stock) => {
    const scoresPerIndicator = indicatorsAndWeights.map((item) => {
      const ranking = stock.indicatorsRanking[item.indicator] as number;
      return ranking * item.weight;
    });

    const score = scoresPerIndicator.reduce(scoresReducer, 0) / weightsSum;
    stock.score = score;
  });

  stocksCopy.sort((A, B) => A.score - B.score);

  if (options.filterSameEnterpriseStocks) {
    const alreadyListed: any[] = [];

    stocksCopy = stocksCopy.filter((stock) => {
      const stockCodeWithoutNumber = stock.code.slice(0, 4);

      if (alreadyListed.includes(stockCodeWithoutNumber)) {
        return false;
      }

      alreadyListed.push(stockCodeWithoutNumber);

      return true;
    });
  }

  stocksCopy.forEach((stock, index) => {
    stock.score_position = index + 1;
  });

  return stocksCopy;
}
