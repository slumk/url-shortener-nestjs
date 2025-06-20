import {
  addDays,
  addMinutes,
  addMonths,
  addWeeks,
  differenceInYears,
  endOfDay,
  endOfWeek,
  formatDate,
  isAfter,
  parse,
  startOfDay,
  subMonths,
  lastDayOfMonth,
  isThursday,
  subWeeks,
  subDays,
  addHours,
  getHours,
  differenceInHours,
  subHours
} from 'date-fns';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';
let timeZone = 'Asia/Kolkata';

const getYearsCount = (earlyDate: Date, lateDate: Date = new Date()) =>
  differenceInYears(lateDate, earlyDate);

const format = (date: Date, format = 'dd-MM-yyyy') => formatDate(toZonedTime(date, timeZone), format)

const getTwelveHourTimeFromDate = (date: Date) => format(date, 'hh aa')

const convertAnyDateToNativeDate = (
  dateString = '',
  end = false,
  start = false,
  format = 'yyyy-MM-dd',
  utcDate = true,
): Date => {
  // dateString should be in DD-MM-YYYY format
  // const generatedDate = parse(dateString, format, new Date());
  let generatedDate = parse(dateString, format, new Date());
  // const localDate = toZonedTime(generatedDate, 'Asia/Kolkata');
  if (end) generatedDate = endOfDay(generatedDate);
  else if (start) generatedDate = startOfDay(generatedDate);
  return utcDate ? getUTCTime(generatedDate) : generatedDate;
};

const addDaysToDate = (dayCount: number, date = new Date()) =>
  addDays(date, dayCount);
const addWeekToDate = (weekCount: number, date = new Date()) =>
  addWeeks(date, weekCount);
const subWeekFromDate = (weekCount: number, date = new Date()) =>
  subWeeks(date, weekCount);
const addMinutesToDate = (minuteCount: number, date = new Date()) =>
  addMinutes(date, minuteCount);

const addHoursToDate = (hourCount: number, date = new Date()) => addHours(date, hourCount)

const getCurrentDate = (start = false, end = false) => {
  let date = new Date()
  if (start) date = startOfDay(date);
  if (end) date = endOfDay(date)
  return getUTCTime(date)
};

const isAfterDate = (dateA: Date, dateB: Date = new Date()) =>
  isAfter(dateA, dateB);

const getWeekEndDate = (date: Date) => endOfWeek(date, { weekStartsOn: 0 });
const getUTCTime = (date: Date) => fromZonedTime(date, timeZone);

const subMonthFromAMonth = (date: Date, monthCount: number) =>
  subMonths(date, monthCount);

const getLastThursdayOfMonth = (date: Date = new Date()) => {
  const lastDay = lastDayOfMonth(date);
  let currentDay = lastDay
  let count = 0;
  while (!isThursday(currentDay) && count < 7) {
    currentDay = subDays(currentDay, 1);
    count++;
  }
  return currentDay;
}

const diffInHours = (dateA: Date, dateB: Date = new Date()) => differenceInHours(dateB, dateA)
const subtractHours = (amount: number, date: Date = new Date()) => subHours(date, amount)

const getDayName = (date: Date = new Date()) => format(date, 'EEEE')

export default {
  getYearsCount,
  getDayName,
  isAfterDate,
  format,
  subHours: subtractHours,
  addMinutesToDate,
  convertAnyDateToNativeDate,
  getTwelveHourTimeFromDate,
  subMonths: subMonthFromAMonth,
  addMonths,
  addDaysToDate,
  getLastThursdayOfMonth,
  diffInHours,
  subWeekFromDate,
  endOfDay,
  startOfDay,
  getCurrentDate,
  addHoursToDate,
  getWeekEndDate,
  getUTCTime,
  addWeekToDate
};
