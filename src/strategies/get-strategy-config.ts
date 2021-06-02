import { Strategy, StrategyName } from "@protocols/strategy";
import bazin from "@strategies/bazin";
import custom from "@strategies/custom";
import marciorasf from "@strategies/marciorasf";
import onlyEbit from "@strategies/only-ebit";

const strategies: Record<StrategyName, Strategy> = {
  marciorasf,
  bazin,
  onlyEbit,
  custom,
};

export default function getStrategyConfig(strategyName: StrategyName): Strategy {
  return strategies[strategyName];
}
