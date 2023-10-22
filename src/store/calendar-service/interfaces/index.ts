export interface Task {
  date: Date | null;
  label: string;
  colors: Array<string>;
  taskId: string;
}

export interface Holiday {
  date: string;
  localName: string;
  countryCode: string;
}

export interface CalendarDay {
  date: Date;
  monthDay: number;
  month: string;
  tasks: Array<Task>;
  id: string;
  holidayInfo: Holiday | null;
}

export interface CalendarData {
  data: Array<CalendarDay>;
  total: number;
}

export interface CalendarValues {
  currentDay: number;
  calendarData: CalendarData;
  isFetching: boolean;
  error: string | null;
}
