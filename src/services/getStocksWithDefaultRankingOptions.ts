import "../config/mongo";
import calculateScoresAndSort from "./calculateScoresAndSort";
import getLastImport from "./getLastImport";

export default async function getStocksWithDefaultRankingOptions(
  filterSameEnterpriseStocks = false
) {
  const lastImport = await getLastImport();
  const stocksInOrder = calculateScoresAndSort(
    lastImport.stocks,
    [
      {
        indicator: "ev/ebit",
        weight: 10,
      },
      {
        indicator: "roic",
        weight: 10,
      },
    ],
    {
      filterSameEnterpriseStocks,
    }
  );

  return stocksInOrder;
}
