import { Field, ObjectType } from "type-graphql";

import { prop as Property } from "@typegoose/typegoose";

import StockIndicators from "@protocols/stock-indicators";

@ObjectType()
export default class Stock {
  @Field()
  @Property()
  code!: string;

  @Field(() => StockIndicators)
  @Property()
  indicatorsValues: StockIndicators;
}
