import { Query, Resolver } from "type-graphql";

import { StocksImportModel } from "../entities/stocks-import";
import StocksImport from "../types/stocks-import";

@Resolver()
export class StocksImportResolver {
  @Query(() => StocksImport, { nullable: true })
  async lastStocksImport() {
    const lastStocksImport = await StocksImportModel.findOne();
    return lastStocksImport;
  }
}
