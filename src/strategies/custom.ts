import { Strategy } from "@protocols/strategy";

const custom: Strategy = {
  filters: {
    liquidez_media_diaria: {
      min: 100000,
    },
    roic: {
      min: 0,
    },
    divida_liquida_por_ebit: {
      max: 3,
    },
    divida_liquida_por_patrimonio_liquido: {
      max: 1,
    },
    dividend_yield: {
      min: 6,
    },
  },
  rankingWeights: {
    dividend_yield: 1,
  },
};

export default custom;
