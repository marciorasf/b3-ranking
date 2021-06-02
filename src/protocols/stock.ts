import { Field, ObjectType } from "type-graphql";

import StockIndicators from "@protocols/stock-indicators";
import { prop as Property } from "@typegoose/typegoose";

@ObjectType()
export default class Stock {
  @Field()
  @Property()
  code!: string;

  @Field(() => StockIndicators)
  @Property()
  indicatorsValues: StockIndicators;
}
