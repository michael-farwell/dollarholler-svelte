export const sumLineItems = (lineItems: LineItem[] | undefined): number => {
  if (!lineItems) return 0;
  return lineItems.reduce((acc, x) => acc + x.amount, 0);
};

export const asCurrency = (
    value: number | undefined,
    currency: string = "USD",
    digits: number = 2): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    currencySign: "accounting",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  return formatter.format((value || 0) / 100);
};