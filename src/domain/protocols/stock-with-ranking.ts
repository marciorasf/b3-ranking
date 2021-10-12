import Stock from "@domain/protocols/stock";
import StockIndicators from "@domain/protocols/stock-indicators";
import { prop as Property } from "@typegoose/typegoose";

export default class StockWithRanking extends Stock {
  @Property()
  indicatorsRanking: StockIndicators;
}
