import { getModelForClass } from "@typegoose/typegoose";

import StocksImport from "@protocols/stocks-import";

export const StocksImportModel = getModelForClass(StocksImport);
