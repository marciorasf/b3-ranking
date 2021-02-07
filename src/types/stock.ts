import { Field, ObjectType } from "type-graphql";

import { prop as Property } from "@typegoose/typegoose";

import StockIndicators from "./stock-indicators";

@ObjectType()
export default class Stock {
  @Field()
  @Property()
  code!: string;

  @Field(() => StockIndicators)
  @Property()
  indicatorsValues: StockIndicators;

  @Field(() => StockIndicators)
  @Property()
  indicatorsRanking?: StockIndicators;
}
