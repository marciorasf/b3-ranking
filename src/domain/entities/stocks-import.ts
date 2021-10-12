import StocksImport from "@domain/protocols/stocks-import";
import { getModelForClass } from "@typegoose/typegoose";

export const StocksImportModel = getModelForClass(StocksImport);
