import { Strategy } from "@protocols/strategy";

const custom: Strategy = {
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
  },
  rankingWeights: {
    enterprise_value_por_ebit: 1,
  },
};

export default custom;
