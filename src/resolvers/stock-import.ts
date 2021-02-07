import { Query, Resolver } from "type-graphql";

import StocksImport, { StocksImportModel } from "../entities/stocks-import";

@Resolver()
export class StocksImportResolver {
  @Query(() => StocksImport, { nullable: true })
  async lastStocksImport() {
    const lastStocksImport = await StocksImportModel.findOne();
    return lastStocksImport;
  }
}
