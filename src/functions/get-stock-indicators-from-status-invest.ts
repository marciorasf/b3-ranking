import axios from "axios";
import cheerio from "cheerio";

import StockIndicators, { Indicator } from "../types/stock-indicators";

interface ValueNodeChildren {
  data: any;
}

interface ValueNode {
  children: ValueNodeChildren[];
}

function formatStringValue(value: string) {
  const number = parseFloat(value.replace(/\./g, "").replace(",", ".").replace("%", ""));
  return Number.isNaN(number) ? null : number;
}

function getLiquidezMediaDiaria(html: string) {
  const $ = cheerio.load(html);

  const liquidez_media_diaria_string = $(".card>.top-info>div:nth-child(3) strong.value").html();

  const liquidez_media_diaria = formatStringValue(liquidez_media_diaria_string || "");

  return liquidez_media_diaria;
}

function getIndicatorsNodes(html: string) {
  const $ = cheerio.load(html);

  const indicatorsSection = $(".indicator-today-container .d-flex.flex-wrap").html() as string;
  cheerio.load(indicatorsSection);

  const valuesNodes = ($(
    "strong.value.d-block.lh-4.fs-4.fw-700"
  ).toArray() as unknown) as ValueNode[];

  return valuesNodes;
}

export default async function getStockIndicatorsFromStatusInvest(code: string) {
  const response = await axios.get(`https://statusinvest.com.br/acoes/${code}`, { timeout: 20000 });

  const html = response.data;

  const indicatorsNodes = getIndicatorsNodes(html);

  const indicatorsKeysInOrder: Indicator[] = [
    "dividend_yield",
    "preco_da_acao_por_lucro",
    "peg_ratio",
    "preco_da_acao_por_valor_patrimonial",
    "enterprise_value_por_ebitda",
    "enterprise_value_por_ebit",
    "preco_da_acao_por_ebitda",
    "preco_da_acao_por_ebit",
    "valor_patrimonial_por_acao",
    "preco_da_acao_por_ativos",
    "lucro_por_acao",
    "preco_da_acao_por_receita_liquida",
    "preco_da_acao_por_capital_de_giro",
    "preco_da_acao_por_ativo_circulante_liquido",
    "divida_liquida_por_patrimonio_liquido",
    "divida_liquida_por_ebitda",
    "divida_liquida_por_ebit",
    "patrimonio_liquido_por_ativos",
    "passivos_por_ativos",
    "liquidez_corrente",
    "margem_bruta",
    "margem_ebitda",
    "margem_ebit",
    "margem_liquida",
    "roe",
    "roa",
    "roic",
    "giro_ativos",
    "cagr_receitas_5_anos",
    "cagr_lucros_5_anos",
  ];

  if (indicatorsNodes.length !== indicatorsKeysInOrder.length) {
    throw Error("different lengths");
  }

  const liquidez_media_diaria = getLiquidezMediaDiaria(html);
  const indicators: any = {
    liquidez_media_diaria,
  };

  indicatorsKeysInOrder.forEach((key, index) => {
    indicators[key] = formatStringValue(indicatorsNodes[index].children[0].data);
  });

  return indicators as StockIndicators;
}
