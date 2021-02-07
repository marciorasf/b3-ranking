import { Query, Resolver } from "type-graphql";

import getLastImport from "../services/getLastImport";
import StocksImport from "../types/stocks-import";

@Resolver()
export class StocksImportResolver {
  @Query(() => StocksImport)
  async lastImport() {
    const lastStocksImport = await getLastImport();
    return lastStocksImport;
  }
}
