import { Query, Resolver } from "type-graphql";

import getLastImport from "../services/get-last-import";
import StocksImport from "../types/stocks-import";

@Resolver()
export class StocksImportResolver {
  @Query(() => StocksImport)
  async currentStocks() {
    const stocks = await getLastImport();
    return stocks;
  }
}
