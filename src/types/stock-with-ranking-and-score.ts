import { Field, ObjectType } from "type-graphql";

import StockWithRanking from "./stock-with-ranking";

@ObjectType()
export default class StockWithRankingAndScore extends StockWithRanking {
  @Field()
  score!: number;

  @Field()
  score_position!: number;
}
