import axios from "axios";
import cheerio from "cheerio";

interface ValueNodeChildren {
  data: any;
}

interface ValueNode {
  children: ValueNodeChildren[];
}

function formatInput(value: string) {
  const number = parseFloat(value.replace(",", ".").replace("%", ""));
  return Number.isNaN(number) ? null : number;
}

export default async function getStockIndicators(code: string) {
  const response = await axios.get(
    `https://statusinvest.com.br/acoes/${code}`,
    { timeout: 20000 }
  );

  const html = response.data;
  const $ = cheerio.load(html);
  const indicatorsSection = $(
    ".today-historical-container .d-flex.flex-wrap"
  ).html() as string;
  cheerio.load(indicatorsSection);

  const valuesNodes = ($(
    "strong.value.d-block.lh-4.fs-4.fw-700"
  ).toArray() as unknown) as ValueNode[];

  const indicatorsKeysInOrder = [
    "dy",
    "p/l",
    "peg_ratio",
    "p/vp",
    "ev/ebtida",
    "ev/ebit",
    "p/ebitda",
    "p/ebit",
    "vpa",
    "p/ativo",
    "lpa",
    "p/sr",
    "p/cap_giro",
    "p/ativo_circ_liq",
    "div_liquida/pl",
    "div_liquida/ebitda",
    "div_liquida/ebit",
    "pl/ativos",
    "passivo/ativos",
    "liq_corrent",
    "m_bruta",
    "m_ebitda",
    "m_ebit",
    "m_liquida",
    "roe",
    "roa",
    "roic",
    "giro_ativos",
    "cagr_receitas_5_anos",
    "cagr_lucros_5_anos",
  ];

  if (valuesNodes.length !== indicatorsKeysInOrder.length) {
    throw Error("different lengths");
  }

  const indicators: any = {};
  indicatorsKeysInOrder.forEach((key, index) => {
    indicators[key] = formatInput(valuesNodes[index].children[0].data);
  });

  return indicators;
}
