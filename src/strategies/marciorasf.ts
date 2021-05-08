import calculateScores from "../functions/calculate-scores";
import filterStocks from "../functions/filter-stocks";
import sortStocksWithScores from "../functions/sort-stocks-with-scores";
import Stock from "../types/stock";

export default function marciorasf(stocks: Stock[]) {
  const filteredStocks = filterStocks(stocks, {
    liquidez_media_diaria: {
      min: 100000,
    },
    enterprise_value_por_ebit: {
      min: 0,
      max: 10,
    },
    roic: {
      min: 0,
    },
    divida_liquida_por_ebit: {
      max: 3,
    },
    divida_liquida_por_patrimonio_liquido: {
      max: 1,
    },
  });

  const stocksWithScores = calculateScores(filteredStocks, {
    enterprise_value_por_ebit: 1,
  });

  const sortedStocks = sortStocksWithScores(stocksWithScores);

  return sortedStocks;
}
