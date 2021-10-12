import { Strategy } from "@domain/protocols/strategy";

const greenblatt: Strategy = {
  filters: {},
  rankingWeights: {
    enterprise_value_por_ebit: 1,
    roic: 1,
  },
};

export default greenblatt;
