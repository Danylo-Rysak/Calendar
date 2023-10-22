import { PayloadAction } from '@reduxjs/toolkit';
// Actions
import { getCalendarWithNewTask, getCalendarWithoutDeletedTask } from 'core/functions';
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

export const deleteTaskOperation = (
  state: CalendarValues,
  action: PayloadAction<{ dayId: string; taskId: string }>
) => {
  const { dayId, taskId } = action.payload;
  const newCalendar = getCalendarWithoutDeletedTask(
    state.calendarData.data,
    dayId,
    taskId
  );
  state.calendarData = { data: newCalendar, total: newCalendar.length };
};
