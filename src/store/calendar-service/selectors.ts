import { StoreType } from '../root';

export const getCalendarDataSelector = (store: StoreType) => {
  return store.calendarStore.calendarData;
};
