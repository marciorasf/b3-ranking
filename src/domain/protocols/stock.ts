import StockIndicators from "@domain/protocols/stock-indicators";
import { prop as Property } from "@typegoose/typegoose";

export default class Stock {
  @Property()
  code!: string;

  @Property()
  indicatorsValues: StockIndicators;
}
