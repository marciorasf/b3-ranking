import StockWithScore from "@domain/protocols/stock-with-score";

export default function filterSameEnterpriseStocks(sortedStocks: StockWithScore[]) {
  const alreadyIncludedStocks = new Set();

  const sortedStocksWithoutDuplicates = sortedStocks.filter((stock) => {
    const stockCodePrefix = stock.code.slice(0, 4);

    if (alreadyIncludedStocks.has(stockCodePrefix)) {
      return false;
    }

    alreadyIncludedStocks.add(stockCodePrefix);
    return true;
  });

  return sortedStocksWithoutDuplicates;
}
