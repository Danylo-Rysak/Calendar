// Interfaces
import { CalendarDay, Holiday } from 'store/calendar-service/interfaces';
// Constants
import { months } from 'core/contants';

export const getDaysInCurrentMonth = (month: number): Array<Date> => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const currentMonthDays = getCurrentMonthDays();

  const firstWeekDay = currentMonthDays[0].getDay();
  const isSundayFirstDay = firstWeekDay === 0;

  const previousMonthDays: Array<Date> = [];

  if (!isSundayFirstDay) {
    const addArr = new Array(firstWeekDay)
      .fill('')
      .map((_date, i) => new Date(currentYear, month - 1, 0 - i))
      .reverse();

    previousMonthDays.push(...addArr);
  }

  const nextMonthsDays: Array<Date> = [];

  const lastDay = currentMonthDays[currentMonthDays.length - 1].getDay();
  const isSaturdayLastDay = lastDay === 6;

  if (!isSaturdayLastDay) {
    const addArr = new Array(6 - lastDay)
      .fill('')
      .map((_date, i) => new Date(currentYear, month, i + 1));
    nextMonthsDays.push(...addArr);
  }

  return [...previousMonthDays, ...currentMonthDays, ...nextMonthsDays];

  function getCurrentMonthDays() {
    return new Array(31)
      .fill('')
      .map((_date, i) => new Date(currentYear, month - 1, i + 1))
      .filter((date) => date.getMonth() === month - 1);
  }
};

export const getMonthByNumber = (month: number): string => months[month];

export const getCalendarCellValue = (
  date: Date,
  holidays: Array<Holiday> | undefined
): CalendarDay => {
  const year = date.getFullYear();
  const monthDay = date.getDate();
  const monthNumber = date.getMonth();

  const month = getMonthByNumber(monthNumber);

  let holidayInfo: Holiday | null = null;

  if (holidays) {
    const holidaysDates = holidays?.map((holiday) => {
      const fullDate = new Date(holiday.date);
      const holidayYear = fullDate.getFullYear();
      const holidayMonth = fullDate.getMonth();
      const holidayDay = fullDate.getDate();

      return {
        compareHolidayDate: new Date(holidayYear, holidayMonth, holidayDay),
        holidayDate: holiday.date,
      };
    });

    holidayInfo = holidaysDates
      .map(({ compareHolidayDate, holidayDate }) => {
        const newComparedCalendarDate = new Date(year, monthNumber, monthDay);

        const isHoliday =
          compareHolidayDate.getTime() === newComparedCalendarDate.getTime();

        if (isHoliday) {
          const holiday = holidays?.find((holiday) => holiday.date === holidayDate);
          return holiday ? holiday : null;
        }
        return null;
      })
      .filter((holiday) => !!holiday)[0];
  }

  return {
    date,
    monthDay,
    month,
    tasks: [],
    holidayInfo,
    id: date.getDay() * monthDay + date.getDate().toString() + month,
  };
};

export const getTaskAmountInfo = (allTasksLength: number): string =>
  `${allTasksLength}/${3} ${allTasksLength === 1 ? 'task' : 'tasks'}`;
