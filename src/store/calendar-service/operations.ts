import { PayloadAction } from '@reduxjs/toolkit';
// Actions
import {
  getCalendarWithEditedTask,
  getCalendarWithNewTask,
  getCalendarWithoutDeletedTask,
  getNewCalendarAfterDragAndDrop,
  getNewCalendarAfterTaskSwipe,
} from 'core/functions';
// Interfaces
import { CalendarValues, CalendarDay, Task } from './interfaces';

export const addTaskOperation = (
  state: CalendarValues,
  action: PayloadAction<{ dayId: string; newTask: Task }>
) => {
  const { dayId, newTask } = action.payload;
  const newCalendar = getCalendarWithNewTask(state.calendarData.data, dayId, newTask);
  state.calendarData = { data: newCalendar, total: newCalendar.length };
};

export const editTaskOperation = (
  state: CalendarValues,
  action: PayloadAction<{ dayId: string; editedTask: Task }>
) => {
  const { dayId, editedTask } = action.payload;
  const newCalendar = getCalendarWithEditedTask(
    state.calendarData.data,
    dayId,
    editedTask
  );
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

export const dragAndDropTaskOperation = (
  state: CalendarValues,
  action: PayloadAction<{
    pickedCalendarDay: CalendarDay;
    newPickedDay: CalendarDay;
    previousCalendarDay: CalendarDay;
    newPreviousDay: CalendarDay;
  }>
) => {
  const { pickedCalendarDay, newPickedDay, previousCalendarDay, newPreviousDay } =
    action.payload;
  const newCalendar = getNewCalendarAfterDragAndDrop(
    state.calendarData.data,
    pickedCalendarDay,
    newPickedDay,
    previousCalendarDay,
    newPreviousDay
  );
  state.calendarData = { data: newCalendar, total: newCalendar.length };
};

export const dragAndDropTaskInDayOperation = (
  state: CalendarValues,
  action: PayloadAction<{ newCurrentCalendarDay: CalendarDay; swapCalendarDayId: string }>
) => {
  const { newCurrentCalendarDay, swapCalendarDayId } = action.payload;
  const newCalendar = getNewCalendarAfterTaskSwipe(
    state.calendarData.data,
    newCurrentCalendarDay,
    swapCalendarDayId
  );
  state.calendarData = { data: newCalendar, total: newCalendar.length };
};
