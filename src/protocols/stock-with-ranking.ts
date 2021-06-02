import { Field, ObjectType } from "type-graphql";

import Stock from "@protocols/stock";
import StockIndicators from "@protocols/stock-indicators";
import { prop as Property } from "@typegoose/typegoose";

@ObjectType()
export default class StockWithRanking extends Stock {
  @Field(() => StockIndicators)
  @Property()
  indicatorsRanking: StockIndicators;
}
