const TON_TO_USD_CONVERSION_RATE = 6.9;

export function convertTonToUsd(ton: number): string {
  const usd = (ton * TON_TO_USD_CONVERSION_RATE).toFixed(2);
  return `$${usd}`;
}
