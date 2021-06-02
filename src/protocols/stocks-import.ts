import { Field, ID, ObjectType } from "type-graphql";

import Stock from "@protocols/stock";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";

@ObjectType()
export default class StocksImport {
  @Field(() => ID)
  id!: number;

  @Field(() => [String])
  @Property({ required: false, type: [String] })
  importErrors!: string[];

  @Field(() => [Stock])
  @Property({ required: true, type: [Stock] })
  stocks!: Stock[];

  @Field()
  @Property({ required: true, default: new Date() })
  date!: Date;
}

export const StocksImportModel = getModelForClass(StocksImport);
