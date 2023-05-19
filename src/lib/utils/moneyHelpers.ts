export const sumLineItems = (lineItems: LineItem[] | undefined): number => {
  if (!lineItems) return 0;
  return lineItems.reduce((acc, x) => acc + x.amount, 0);
};

export const centsToDollars = (cents: number): string => {
  const dollars = cents / 100;
  const addDecimals = twoDecimals(dollars);
  return addThousandsSeparator(addDecimals);
};

export const twoDecimals = (myNumber: number): string => myNumber.toFixed(2);

export const addThousandsSeparator = (myNumber: string): string => myNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");