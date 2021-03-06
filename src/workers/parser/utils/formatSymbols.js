import getSymbols from "../getSymbols";

export function formatSymbols(source: Source) {
  const symbols = getSymbols(source);

  function formatLocation(loc) {
    if (!loc) {
      return "";
    }
    const { start, end } = loc;

    const startLoc = `(${start.line}, ${start.column})`;
    const endLoc = `(${end.line}, ${end.column})`;
    return `[${startLoc}, ${endLoc}]`;
  }

  function summarize(symbol) {
    const loc = formatLocation(symbol.location);
    const exprLoc = formatLocation(symbol.expressionLocation);
    const params = symbol.parameterNames
      ? `(${symbol.parameterNames.join(", ")})`
      : "";
    const expression = symbol.expression || "";
    const klass = symbol.klass || "";

    return `${loc} ${exprLoc} ${expression} ${symbol.name}${params} ${klass}`.trim(); // eslint-disable-line max-len
  }

  return Object.keys(symbols)
    .map(name => `${name}:\n${symbols[name].map(summarize).join("\n")}`)
    .join("\n\n");
}
