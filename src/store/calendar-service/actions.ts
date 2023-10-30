// Libs
import { createAsyncThunk } from '@reduxjs/toolkit';
// Functions
import { getCalendarCellValue, getDaysInCurrentMonth } from 'core/functions';
// Action Types
import { CalendarGetData } from 'store/action-types';
// API
import { holidaysFetch } from 'core/api';

export const fetchCalendarData = createAsyncThunk(CalendarGetData, async () => {
  try {
    const localCalendarData = localStorage.getItem('calendar');

    if (localCalendarData) {
      const parsedCalendarData = JSON.parse(localCalendarData);
      return { data: parsedCalendarData.data };
    } else {
      const holidays = await holidaysFetch();
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const days = getDaysInCurrentMonth(currentMonth);
      const newCalendarData = days.map((day) => getCalendarCellValue(day, holidays));
      return { data: newCalendarData };
    }
  } catch (error) {
    throw error;
  }
});
