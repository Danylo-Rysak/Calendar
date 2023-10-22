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
    const holidays = await holidaysFetch();
    const currentCalendarData = localStorage.getItem('calendar');

    if (currentCalendarData) {
      const parsedCalendarData = JSON.parse(currentCalendarData);
      return { data: parsedCalendarData };
    } else {
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
