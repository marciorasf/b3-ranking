import { StocksImportModel } from "@domain/entities/stocks-import";
import StocksImport from "@domain/protocols/stocks-import";

export default async function getLastImport(): Promise<StocksImport | null> {
  return StocksImportModel.findOne().sort({ date: -1 });
}
