function sortAsc(stocks: any[], indicator: string) {
  const copy = stocks.slice();
  copy.sort((stockA, stockB) => {
    const indicatorA = stockA.indicators[indicator];
    const indicatorB = stockB.indicators[indicator];

    return indicatorA - indicatorB;
  });

  return copy;
}

function sortDesc(stocks: any[], indicator: string) {
  const copy = stocks.slice();
  copy.sort((stockA, stockB) => {
    const indicatorA = stockA.indicators[indicator];
    const indicatorB = stockB.indicators[indicator];

    return indicatorB - indicatorA;
  });

  return copy;
}

function sortAscPositive(stocks: any[], indicator: string) {
  const copy = stocks.slice();
  copy.sort((stockA, stockB) => {
    const indicatorA = stockA.indicators[indicator];
    const indicatorB = stockB.indicators[indicator];

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

const indicatorsRankingSortFunctions = {
  dy: sortAsc,
  "p/l": sortAscPositive,
  peg_ratio: sortAscPositive,
  "p/vp": sortAsc,
  "ev/ebtida": sortAscPositive,
  "ev/ebit": sortAscPositive,
  "p/ebitda": sortAscPositive,
  "p/ebit": sortAscPositive,
  vpa: sortAsc,
  "p/ativo": sortAsc,
  lpa: sortAscPositive,
  "p/sr": sortAscPositive,
  "p/cap_giro": sortAscPositive,
  "p/ativo_circ_liq": sortAscPositive,
  "div_liquida/pl": sortAsc,
  "div_liquida/ebitda": sortAsc,
  "div_liquida/ebit": sortAsc,
  "pl/ativos": sortDesc,
  "passivo/ativos": sortAscPositive,
  liq_corrent: sortDesc,
  m_bruta: sortDesc,
  m_ebitda: sortDesc,
  m_ebit: sortDesc,
  m_liquida: sortDesc,
  roe: sortDesc,
  roa: sortDesc,
  roic: sortDesc,
  giro_ativos: sortDesc,
  cagr_receitas_5_anos: sortDesc,
  cagr_lucros_5_anos: sortDesc,
};

export default function calculateRankingPositions(stocks: any[]) {
  let stocksWithRanking = stocks.slice();

  stocksWithRanking = stocksWithRanking.map((stock) => ({
    ...stock,
    ranking: {},
  }));

  Object.keys(indicatorsRankingSortFunctions).forEach((indicator) => {
    const sortFunction = indicatorsRankingSortFunctions[indicator];
    stocksWithRanking = sortFunction(stocksWithRanking, indicator);

    stocksWithRanking.forEach((stock, index) => {
      stock.ranking[indicator] = index + 1;
    });
  });

  return stocksWithRanking;
}
