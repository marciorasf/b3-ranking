import { Query, Resolver } from "type-graphql";

import getLastImport from "@functions/get-last-import";
import StocksImport from "@protocols/stocks-import";

@Resolver()
export class StocksImportResolver {
  @Query(() => StocksImport)
  async currentStocks() {
    const stocks = await getLastImport();
    return stocks;
  }
}
