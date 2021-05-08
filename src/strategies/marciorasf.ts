import calculateScores from "../functions/calculate-scores";
import filterStocks from "../functions/filter-stocks";
import sortStocksWithScores from "../functions/sort-stocks-with-scores";
import Stock from "../types/stock";

export default function marciorasf(stocks: Stock[]) {
  const filteredStocks = filterStocks(stocks, {
    liquidez_media_diaria: {
      min: 200000,
    },
    enterprise_value_por_ebit: {
      min: 0,
      max: 6,
    },
  });

  const stocksWithScores = calculateScores(filteredStocks, {
    enterprise_value_por_ebit: 1,
    dividend_yield: 1,
  });

  const sortedStocks = sortStocksWithScores(stocksWithScores);

  return sortedStocks;
}
