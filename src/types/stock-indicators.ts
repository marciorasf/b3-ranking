import { Field, ObjectType } from "type-graphql";

import { prop as Property } from "@typegoose/typegoose";

@ObjectType()
export default class StockIndicators {
  @Field()
  @Property()
  dividend_yield?: number;

  @Field()
  @Property()
  preco_da_acao_por_lucro?: number;

  @Field()
  @Property()
  peg_ratio?: number;

  @Field()
  @Property()
  preco_da_acao_por_valor_patrimonial?: number;

  @Field()
  @Property()
  enterprise_value_por_ebitda?: number;

  @Field()
  @Property()
  enterprise_value_por_ebit?: number;

  @Field()
  @Property()
  preco_da_acao_por_ebitda?: number;

  @Field()
  @Property()
  preco_da_acao_por_ebit?: number;

  @Field()
  @Property()
  valor_patrimonial_por_acao?: number;

  @Field()
  @Property()
  preco_da_acao_por_ativos?: number;

  @Field()
  @Property()
  lucro_por_acao?: number;

  @Field()
  @Property()
  preco_da_acao_por_receita_liquida?: number;

  @Field()
  @Property()
  preco_da_acao_por_capital_de_giro?: number;

  @Field()
  @Property()
  preco_da_acao_por_ativo_circulante_liquido?: number;

  @Field()
  @Property()
  divida_liquida_por_patrimonio_liquido?: number;

  @Field()
  @Property()
  divida_liquida_por_ebitda?: number;

  @Field()
  @Property()
  divida_liquida_por_ebit?: number;

  @Field()
  @Property()
  patrimonio_liquido_por_ativos?: number;

  @Field()
  @Property()
  passivos_por_ativos?: number;

  @Field()
  @Property()
  liquidez_corrente?: number;

  @Field()
  @Property()
  margem_bruta?: number;

  @Field()
  @Property()
  margem_ebitda?: number;

  @Field()
  @Property()
  margem_ebit?: number;

  @Field()
  @Property()
  margem_liquida?: number;

  @Field()
  @Property()
  roe?: number;

  @Field()
  @Property()
  roa?: number;

  @Field()
  @Property()
  roic?: number;

  @Field()
  @Property()
  giro_ativos?: number;

  @Field()
  @Property()
  cagr_receitas_5_anos?: number;

  @Field()
  @Property()
  cagr_lucros_5_anos?: number;
}

export type Indicator = keyof StockIndicators;