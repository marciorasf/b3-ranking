import Stock from "@protocols/stock";
import StockIndicators from "@protocols/stock-indicators";
import { prop as Property } from "@typegoose/typegoose";

export default class StockWithRanking extends Stock {
  @Property()
  indicatorsRanking: StockIndicators;
}
