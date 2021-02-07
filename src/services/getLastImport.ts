import { StocksImportModel } from "../entities/stocks-import";
import StocksImport from "../types/stocks-import";

export default async function getLastImport(): Promise<StocksImport | null> {
  return StocksImportModel.findOne().sort({ date: -1 });
}
