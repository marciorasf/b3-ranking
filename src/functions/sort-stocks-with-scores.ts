import StockWithScore from "../types/stock-with-score";

export default function sortStocksWithScores(
  stocksWithScores: StockWithScore[]
) {
  const sortedStocks = stocksWithScores.sort((stockA, stockB) => {
    return stockA.score - stockB.score;
  });
  return sortedStocks;
}
