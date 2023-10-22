import { Holiday } from '../../store/calendar-service/interfaces';
import { HolidayResponse } from './interfaces';
import { baseUrl } from './contants';

export const holidaysFetch = async (): Promise<Array<Holiday> | undefined> => {
  const data = await fetch(baseUrl, { method: 'GET' });
  const allHolidays: Array<HolidayResponse> = await data.json();

  return allHolidays.map(({ date, localName, countryCode }) => ({
    date,
    localName,
    countryCode,
  }));
};
