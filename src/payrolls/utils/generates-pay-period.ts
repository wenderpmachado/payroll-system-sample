import { parseISO } from 'date-fns';
import { IPayPeriod, PAY_PERIOD_OPTIONS, TPayPeriod } from "../../interfaces/time-report-data";

// Partia credits: https://bit.dev/date-fns/date-fns/last-day-of-month/~code
function lastDayOfMonth(dirtyDate) {
  const date = parseISO(dirtyDate)
  const month = date.getMonth()

  date.setFullYear(date.getFullYear(), month + 1, 0)
  date.setHours(0, 0, 0, 0)

  return date
}

export function generatesPayPeriod(prefix: string, period: TPayPeriod): IPayPeriod {
  let firstDay: string;
  let lastDay: string;

  if (period.toLowerCase() === PAY_PERIOD_OPTIONS.FIRST_HALF) {
    firstDay = '01';
    lastDay = '15';
  } else { // PAY_PERIOD_OPTIONS.SECOND_HALF
    firstDay = '16';
    lastDay = lastDayOfMonth(prefix).getDate().toString();
  }

  return {
    startDate: prefix + '-' + firstDay,
    endDate: prefix + '-' + lastDay
  }
}
