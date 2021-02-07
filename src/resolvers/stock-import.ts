import { Query, Resolver } from "type-graphql";

import getLastImport from "../services/getLastImport";
import getStocksWithDefaultRankingOptions from "../services/getStocksWithDefaultRankingOptions";
import StockWithRankingAndScore from "../types/stock-with-ranking-and-score";
import StocksImport from "../types/stocks-import";

@Resolver()
export class StocksImportResolver {
  @Query(() => StocksImport)
  async currentStocks() {
    const stocks = await getLastImport();
    return stocks;
  }

  @Query(() => [StockWithRankingAndScore])
  async stocksByRecommendedRanking() {
    const stocks = await getStocksWithDefaultRankingOptions();
    return stocks;
  }
}
