import { Strategy, StrategyName } from "@domain/protocols/strategy";
import bazin from "@domain/strategies/bazin";
import custom from "@domain/strategies/custom";
import greenblatt from "@domain/strategies/greenblatt";
import marciorasf from "@domain/strategies/marciorasf";
import onlyEbit from "@domain/strategies/only-ebit";

const strategies: Record<StrategyName, Strategy> = {
  greenblatt,
  marciorasf,
  bazin,
  onlyEbit,
  custom,
};

export default function getStrategyConfig(strategyName: StrategyName): Strategy {
  return strategies[strategyName];
}
