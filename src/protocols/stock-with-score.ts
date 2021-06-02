import { Field, ObjectType } from "type-graphql";

import Stock from "@protocols/stock";

@ObjectType()
export default class StockWithScore extends Stock {
  @Field()
  score!: number;
}
