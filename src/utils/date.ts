export function getCurrentOrNextYear() {
  const now = new Date();
  const nextYear = new Date(now.getFullYear() + 1, 0, 1); // January 1st of the next year
  // @ts-expect-error Won't occur
  const daysUntilNextYear = (nextYear - now) / (1000 * 60 * 60 * 24);

  if (daysUntilNextYear < 7) {
    return nextYear.getFullYear();
  } else {
    return now.getFullYear();
  }
}

export function formatDateInYYYYMMDD(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Pad month with leading zero if necessary
  const day = date.getDate().toString().padStart(2, "0"); // Pad day with leading zero if necessary

  return `${year}-${month}-${day}`;
}

export const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function getWeekdayName(date: Date) {
  const weekdayIndex = date.getDay();
  return daysOfWeek[weekdayIndex];
}

export function calculateDateDifferenceInDays(date1: Date, date2: Date) {
  const timeDifference = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
}

export function iterateOverDaysOfTheYear(
  year: number,
  callback: (date: Date) => unknown,
) {
  const firstDayOfYear = new Date(year, 0, 1);
  const lastDayOfYear = new Date(year, 11, 31);

  iterateBetweenDates(firstDayOfYear, lastDayOfYear, callback);
}

export function iterateBetweenDates(
  firstDate: Date,
  secondDate: Date,
  callback: (date: Date) => unknown,
) {
  const daysInBetween =
    (secondDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

  for (let i = 0; i < daysInBetween; i++) {
    const currentDate = new Date(firstDate.getTime() + i * 24 * 60 * 60 * 1000);
    callback(currentDate);
  }
}
