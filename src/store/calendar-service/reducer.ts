// Libs
import { createSlice } from '@reduxjs/toolkit';
// Actions
import { fetchCalendarData } from './actions';
// Operations
import {
  addTaskOperation,
  deleteTaskOperation,
  editTaskOperation,
  dragAndDropTaskOperation,
  dragAndDropTaskInDayOperation,
} from './operations';
// Interfaces
import { CalendarValues } from './interfaces';

const initialState: CalendarValues = {
  currentDay: new Date().getDate(),
  calendarData: {
    data: [],
    total: 0,
  },
  isFetching: false,
  error: null,
};

const calendarStore = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addTask: addTaskOperation,
    editTask: editTaskOperation,
    deleteTask: deleteTaskOperation,
    dragAndDropTask: dragAndDropTaskOperation,
    dragAndDropTaskInDay: dragAndDropTaskInDayOperation,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalendarData.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchCalendarData.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.calendarData = payload.data;
        state.calendarData.total = payload.data.length;
      })
      .addCase(fetchCalendarData.rejected, (state, { error }) => {
        state.isFetching = false;
        state.error = error.message as string;
      });
  },
});

export const { addTask, editTask, deleteTask, dragAndDropTask, dragAndDropTaskInDay } =
  calendarStore.actions;

export default calendarStore.reducer;
