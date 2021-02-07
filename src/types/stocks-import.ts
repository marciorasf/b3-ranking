import { Field, ID, ObjectType } from "type-graphql";

import { prop as Property, getModelForClass } from "@typegoose/typegoose";

import StockWithRanking from "./stock-with-ranking";

@ObjectType()
export default class StocksImport {
  @Field(() => ID)
  id!: number;

  @Field(() => [String])
  @Property({ required: false, type: [String] })
  importErrors!: string[];

  @Field(() => [StockWithRanking])
  @Property({ required: true, type: [StockWithRanking] })
  stocks!: StockWithRanking[];

  @Field()
  @Property({ required: true, default: new Date() })
  date!: Date;
}

export const StocksImportModel = getModelForClass(StocksImport);
