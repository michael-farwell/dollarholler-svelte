/**
 * Takes all the line items and adds them up
 * @param {Array|undefined} lineItems
 * @returns {number}
 */
export const sumLineItems = (lineItems: LineItem[] | undefined): number => {
  if (!lineItems) return 0;
  return lineItems.reduce((acc, x) => acc + x.amount, 0);
};

/**
 * Takes a cents amount and converts into a currency
 * @param {number|undefined} value
 * @param {string} [currency="USD"]
 * @param {number} [digits=2]
 * @returns {string}
 */
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

/**
 * Takes a dollars amount and converts into cents
 * @param {number} dollars
 * @returns {number}
 */
export const dollarsToCents = (dollars: number): number => {
  return dollars * 100;
};

/**
 * Takes all the invoices and adds them up
 * @param {Array|undefined} invoices
 * @returns {number}
 */
export const sumInvoices = (invoices: Invoice[] | undefined): number => {
  if (!invoices) return 0;
  return invoices.reduce((acc, x) => acc + sumLineItems(x.lineItems), 0);
};

/**
 * Takes a number and returns the number with 2 decimal places
 * @param {number} myNum
 * @returns {string}
 */
export const twoDecimals = (myNum: number): string => {
  return myNum.toFixed(2);
};