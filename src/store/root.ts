import { configureStore } from '@reduxjs/toolkit';
import calendarStore from './calendar-service/reducer';

const store = configureStore({
  reducer: {
    calendarStore,
  },
});

// Global store type
export type StoreType = ReturnType<typeof store.getState>;

// Dispatch type
export type DispatchType = typeof store.dispatch;

export default store;
