import { IndicatorsWeights } from "@domain/functions/calculate-scores";
import { Filters } from "@domain/functions/filter-stocks";

export type StrategyName = "greenblatt" | "marciorasf" | "bazin" | "onlyEbit" | "custom";

export type Strategy = {
  filters: Filters;
  rankingWeights: IndicatorsWeights;
};
