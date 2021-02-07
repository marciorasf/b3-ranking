import { getModelForClass } from "@typegoose/typegoose";

import StocksImport from "../types/stocks-import";

export const StocksImportModel = getModelForClass(StocksImport);
