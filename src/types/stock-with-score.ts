import { Field, ObjectType } from "type-graphql";

import Stock from "./stock";

@ObjectType()
export default class StockWithScore extends Stock {
  @Field()
  score!: number;

  @Field()
  score_position!: number;
}
