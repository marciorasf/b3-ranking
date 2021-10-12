import Stock from "@protocols/stock";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";

export default class StocksImport {
  id!: number;

  @Property({ required: false, type: [String] })
  importErrors!: string[];

  @Property({ required: true, type: [Stock] })
  stocks!: Stock[];

  @Property({ required: true, default: new Date() })
  date!: Date;
}

export const StocksImportModel = getModelForClass(StocksImport);
