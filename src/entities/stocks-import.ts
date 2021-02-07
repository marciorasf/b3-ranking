import { Field, ID, ObjectType } from "type-graphql";

import { prop as Property, getModelForClass } from "@typegoose/typegoose";

@ObjectType()
class StockIndicators {
  @Field()
  @Property()
  dividend_yield: number;

  @Field()
  @Property()
  preco_da_acao_por_lucro: number;

  @Field()
  @Property()
  peg_ratio: number;

  @Field()
  @Property()
  preco_da_acao_por_valor_patriomial: number;

  @Field()
  @Property()
  enterprise_value_por_ebitda: number;

  @Field()
  @Property()
  enterprise_value_por_ebit: number;

  @Field()
  @Property()
  preco_da_acao_por_ebitda: number;

  @Field()
  @Property()
  preco_da_acao_por_ebit: number;

  @Field()
  @Property()
  valor_patrimonial_por_acao: number;

  @Field()
  @Property()
  preco_da_acao_por_ativos: number;

  @Field()
  @Property()
  lucro_por_acao: number;

  @Field()
  @Property()
  preco_da_acao_por_receita_liquida: number;

  @Field()
  @Property()
  preco_da_acao_por_capital_de_giro: number;

  @Field()
  @Property()
  preco_da_acao_por_ativo_circulante_liquido: number;

  @Field()
  @Property()
  divida_liquida_por_patrimonio_liquido: number;

  @Field()
  @Property()
  divida_liquida_por_ebtida: number;

  @Field()
  @Property()
  divida_liquida_por_ebit: number;

  @Field()
  @Property()
  patrimonio_liquido_por_ativos: number;

  @Field()
  @Property()
  passivo_por_ativos: number;

  @Field()
  @Property()
  liquidez_corrent: number;

  @Field()
  @Property()
  margem_bruta: number;

  @Field()
  @Property()
  margem_ebtida: number;

  @Field()
  @Property()
  margem_ebit: number;

  @Field()
  @Property()
  margem_liquida: number;

  @Field()
  @Property()
  roe: number;

  @Field()
  @Property()
  roa: number;

  @Field()
  @Property()
  roic: number;

  @Field()
  @Property()
  giro_ativos: number;

  @Field()
  @Property()
  cagr_receita_5_anos: number;

  @Field()
  @Property()
  cagr_lucro_5_anos: number;
}

@ObjectType()
class Stock {
  @Field()
  @Property()
  code!: string;

  @Field(() => StockIndicators)
  @Property()
  indicators!: StockIndicators;

  @Field(() => StockIndicators)
  @Property()
  ranking!: StockIndicators;
}

@ObjectType()
export default class StocksImportSchema {
  @Field(() => ID)
  id!: number;

  @Field(() => [String])
  @Property({ required: false, type: [String] })
  importErrors!: string[];

  @Field(() => [Stock])
  @Property({ required: true, type: [Stock] })
  stocks!: Stock[];

  @Field()
  @Property({ required: true })
  date!: Date;

  @Field()
  @Property({ required: true })
  createdAt!: Date;

  @Field()
  @Property({ required: true })
  updatedAt!: Date;
}

export const StocksImportModel = getModelForClass(StocksImportSchema);
