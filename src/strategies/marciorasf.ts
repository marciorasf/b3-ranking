import { Strategy } from "../types/strategy";

const marciorasf: Strategy = {
  filters: {
    liquidez_media_diaria: {
      min: 100000,
    },
    enterprise_value_por_ebit: {
      min: 0,
      max: 15,
    },
    roic: {
      min: 0,
    },
    roe: {
      min: 0,
    },
    // divida_liquida_por_ebit: {
    //   max: 4.5,
    // },
    // divida_liquida_por_patrimonio_liquido: {
    //   max: 1.5,
    // },
  },
  rankingWeights: {
    enterprise_value_por_ebit: 1,
  },
};

export default marciorasf;
