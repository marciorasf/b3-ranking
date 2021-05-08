import { Field, ObjectType } from "type-graphql";

import { prop as Property } from "@typegoose/typegoose";

@ObjectType()
export default class StockIndicators {
  @Field({ nullable: true })
  @Property()
  liquidez_media_diaria?: number;

  @Field({ nullable: true })
  @Property()
  dividend_yield?: number;

  @Field({ nullable: true })
  @Property()
  preco_da_acao_por_lucro?: number;

  @Field({ nullable: true })
  @Property()
  peg_ratio?: number;

  @Field({ nullable: true })
  @Property()
  preco_da_acao_por_valor_patrimonial?: number;

  @Field({ nullable: true })
  @Property()
  enterprise_value_por_ebitda?: number;

  @Field({ nullable: true })
  @Property()
  enterprise_value_por_ebit?: number;

  @Field({ nullable: true })
  @Property()
  preco_da_acao_por_ebitda?: number;

  @Field({ nullable: true })
  @Property()
  preco_da_acao_por_ebit?: number;

  @Field({ nullable: true })
  @Property()
  valor_patrimonial_por_acao?: number;

  @Field({ nullable: true })
  @Property()
  preco_da_acao_por_ativos?: number;

  @Field({ nullable: true })
  @Property()
  lucro_por_acao?: number;

  @Field({ nullable: true })
  @Property()
  preco_da_acao_por_receita_liquida?: number;

  @Field({ nullable: true })
  @Property()
  preco_da_acao_por_capital_de_giro?: number;

  @Field({ nullable: true })
  @Property()
  preco_da_acao_por_ativo_circulante_liquido?: number;

  @Field({ nullable: true })
  @Property()
  divida_liquida_por_patrimonio_liquido?: number;

  @Field({ nullable: true })
  @Property()
  divida_liquida_por_ebitda?: number;

  @Field({ nullable: true })
  @Property()
  divida_liquida_por_ebit?: number;

  @Field({ nullable: true })
  @Property()
  patrimonio_liquido_por_ativos?: number;

  @Field({ nullable: true })
  @Property()
  passivos_por_ativos?: number;

  @Field({ nullable: true })
  @Property()
  liquidez_corrente?: number;

  @Field({ nullable: true })
  @Property()
  margem_bruta?: number;

  @Field({ nullable: true })
  @Property()
  margem_ebitda?: number;

  @Field({ nullable: true })
  @Property()
  margem_ebit?: number;

  @Field({ nullable: true })
  @Property()
  margem_liquida?: number;

  @Field({ nullable: true })
  @Property()
  roe?: number;

  @Field({ nullable: true })
  @Property()
  roa?: number;

  @Field({ nullable: true })
  @Property()
  roic?: number;

  @Field({ nullable: true })
  @Property()
  giro_ativos?: number;

  @Field({ nullable: true })
  @Property()
  cagr_receitas_5_anos?: number;

  @Field({ nullable: true })
  @Property()
  cagr_lucros_5_anos?: number;
}

export type Indicator = keyof StockIndicators;
