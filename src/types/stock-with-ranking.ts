import { Field, ObjectType } from "type-graphql";

import { prop as Property } from "@typegoose/typegoose";

import Stock from "./stock";
import StockIndicators from "./stock-indicators";

@ObjectType()
export default class StockWithRanking extends Stock {
  @Field(() => StockIndicators)
  @Property()
  indicatorsRanking: StockIndicators;
}
