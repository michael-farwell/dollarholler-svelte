import { format, isBefore } from "date-fns";

export const today = format(new Date(), "yyyy-MM-dd");

/**
 * This takes yyyy-mm-dd and returns m/d/yyyy
 * @param {string} myDate
 * @returns {string} m/d/yyyy
 */
export const convertDate = (myDate: string): string => {
  const [year, month, day] = splitDate(myDate);
  return `${ parseInt(month) }/${ parseInt(day) }/${ year }`;
};

/**
 * Determines whether a date is before today (meaning it's late!)
 * @param {string} myDate
 * @returns {boolean}
 */
export const isLate = (myDate: string): boolean => {
  const [year, month, day] = splitDate(myDate);
  const dueDate = new Date(parseInt(year), parseInt(month), parseInt(day));
  const today = new Date();
  return isBefore(dueDate, today);
};

/**
 * This takes a date yyyy-mm-dd and splits it into an array
 * @param {string} myDate
 * @returns {Array} [yyyy, mm, dd]
 */
export const splitDate = (myDate: string): string[] => myDate.split("-");