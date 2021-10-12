import { prop as Property } from "@typegoose/typegoose";

export default class StockIndicators {
  @Property()
  liquidez_media_diaria?: number;

  @Property()
  dividend_yield?: number;

  @Property()
  preco_da_acao_por_lucro?: number;

  @Property()
  peg_ratio?: number;

  @Property()
  preco_da_acao_por_valor_patrimonial?: number;

  @Property()
  enterprise_value_por_ebitda?: number;

  @Property()
  enterprise_value_por_ebit?: number;

  @Property()
  preco_da_acao_por_ebitda?: number;

  @Property()
  preco_da_acao_por_ebit?: number;

  @Property()
  valor_patrimonial_por_acao?: number;

  @Property()
  preco_da_acao_por_ativos?: number;

  @Property()
  lucro_por_acao?: number;

  @Property()
  preco_da_acao_por_receita_liquida?: number;

  @Property()
  preco_da_acao_por_capital_de_giro?: number;

  @Property()
  preco_da_acao_por_ativo_circulante_liquido?: number;

  @Property()
  divida_liquida_por_patrimonio_liquido?: number;

  @Property()
  divida_liquida_por_ebitda?: number;

  @Property()
  divida_liquida_por_ebit?: number;

  @Property()
  patrimonio_liquido_por_ativos?: number;

  @Property()
  passivos_por_ativos?: number;

  @Property()
  liquidez_corrente?: number;

  @Property()
  margem_bruta?: number;

  @Property()
  margem_ebitda?: number;

  @Property()
  margem_ebit?: number;

  @Property()
  margem_liquida?: number;

  @Property()
  roe?: number;

  @Property()
  roa?: number;

  @Property()
  roic?: number;

  @Property()
  giro_ativos?: number;

  @Property()
  cagr_receitas_5_anos?: number;

  @Property()
  cagr_lucros_5_anos?: number;
}

export type Indicator = keyof StockIndicators;
