import { Strategy } from "../types/strategy";

const bazin: Strategy = {
  filters: {
    liquidez_media_diaria: {
      min: 100000,
    },
    enterprise_value_por_ebit: {
      min: 0,
      max: 10,
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
  },
  rankingWeights: {
    enterprise_value_por_ebit: 1,
  },
};

export default bazin;
