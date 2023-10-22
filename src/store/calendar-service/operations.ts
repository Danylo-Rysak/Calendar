import { PayloadAction } from '@reduxjs/toolkit';
// Actions
import { getCalendarWithNewTask } from 'core/functions';
// Interfaces
import { CalendarValues, Task } from './interfaces';

export const addTaskOperation = (
  state: CalendarValues,
  action: PayloadAction<{ dayId: string; newTask: Task }>
) => {
  const { dayId, newTask } = action.payload;
  const newCalendar = getCalendarWithNewTask(state.calendarData.data, dayId, newTask);
  state.calendarData = { data: newCalendar, total: newCalendar.length };
};
