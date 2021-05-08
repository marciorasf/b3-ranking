/* eslint-disable no-param-reassign */
import Stock from "../types/stock";
import { Indicator } from "../types/stock-indicators";
import StockWithRanking from "../types/stock-with-ranking";

type SortFunction = (
  _stocks: StockWithRanking[],
  _indicator: Indicator
) => StockWithRanking[];

type IndicatorsSortFunctions = Partial<Record<Indicator, SortFunction>>;

function sortAsc(
  stocks: StockWithRanking[],
  indicator: Indicator
): StockWithRanking[] {
  const copy = stocks.slice();
  copy.sort((stockA, stockB) => {
    const indicatorA = stockA.indicatorsValues[indicator] as number;
    const indicatorB = stockB.indicatorsValues[indicator] as number;

    return indicatorA - indicatorB;
  });

  return copy;
}

function sortDesc(
  stocks: StockWithRanking[],
  indicator: Indicator
): StockWithRanking[] {
  const copy = stocks.slice();

  copy.sort((stockA, stockB) => {
    const indicatorA = stockA.indicatorsValues[indicator] as number;
    const indicatorB = stockB.indicatorsValues[indicator] as number;

    return indicatorB - indicatorA;
  });

  return copy;
}

function sortAscPositive(
  stocks: StockWithRanking[],
  indicator: Indicator
): StockWithRanking[] {
  const copy = stocks.slice();
  copy.sort((stockA, stockB) => {
    const indicatorA = stockA.indicatorsValues[indicator] as number;
    const indicatorB = stockB.indicatorsValues[indicator] as number;

    if (indicatorA >= 0 && indicatorB >= 0) {
      return indicatorA - indicatorB;
    }

    if (indicatorA > 0 && indicatorB < 0) {
      return -1;
    }

    if (indicatorA < 0 && indicatorB > 0) {
      return 1;
    }

    if (indicatorA < 0 && indicatorB < 0) {
      return indicatorB - indicatorA;
    }

    return 0;
  });

  return copy;
}

const indicatorsRankingSortFunctions: IndicatorsSortFunctions = {
  dividend_yield: sortDesc,
  preco_da_acao_por_lucro: sortAscPositive,
  peg_ratio: sortAscPositive,
  preco_da_acao_por_valor_patrimonial: sortAscPositive,
  enterprise_value_por_ebitda: sortAscPositive,
  enterprise_value_por_ebit: sortAscPositive,
  preco_da_acao_por_ebitda: sortAscPositive,
  preco_da_acao_por_ebit: sortAscPositive,
  valor_patrimonial_por_acao: sortAsc,
  preco_da_acao_por_ativos: sortAsc,
  lucro_por_acao: sortAscPositive,
  preco_da_acao_por_receita_liquida: sortAscPositive,
  preco_da_acao_por_capital_de_giro: sortAscPositive,
  preco_da_acao_por_ativo_circulante_liquido: sortAscPositive,
  divida_liquida_por_patrimonio_liquido: sortAsc,
  divida_liquida_por_ebitda: sortAsc,
  divida_liquida_por_ebit: sortAsc,
  patrimonio_liquido_por_ativos: sortDesc,
  passivos_por_ativos: sortAscPositive,
  liquidez_corrente: sortDesc,
  margem_bruta: sortDesc,
  margem_ebitda: sortDesc,
  margem_ebit: sortDesc,
  margem_liquida: sortDesc,
  roe: sortDesc,
  roa: sortDesc,
  roic: sortDesc,
  giro_ativos: sortDesc,
  cagr_receitas_5_anos: sortDesc,
  cagr_lucros_5_anos: sortDesc,
};

export default function calculateRanking(
  stocks: Stock[],
  indicators: Indicator[]
) {
  let stocksWithRanking = stocks.map((stock) => ({
    code: stock.code,
    indicatorsValues: stock.indicatorsValues,
    indicatorsRanking: {},
  })) as StockWithRanking[];

  indicators.forEach((indicator) => {
    const sortFunction = indicatorsRankingSortFunctions[
      indicator
    ] as SortFunction;

    stocksWithRanking = sortFunction(stocksWithRanking, indicator);

    stocksWithRanking.forEach((stock: StockWithRanking, index) => {
      stock.indicatorsRanking = {
        ...stock.indicatorsRanking,
        [indicator]: index + 1,
      };
    });
  });

  return stocksWithRanking;
}
