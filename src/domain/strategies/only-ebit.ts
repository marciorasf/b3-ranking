import { Strategy } from "@domain/protocols/strategy";

const onlyEbit: Strategy = {
  filters: {
    liquidez_media_diaria: {
      min: 100000,
    },
  },
  rankingWeights: {
    enterprise_value_por_ebit: 1,
  },
};

export default onlyEbit;
