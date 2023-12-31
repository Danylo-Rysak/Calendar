// Interfaces
import { CalendarDay, Holiday, Task } from 'store/calendar-service/interfaces';
// Constants
import { COLOR, LABEL, months } from 'core/constants';
import { FilterOption } from '../types';

export const getDaysInCurrentMonth = (month: number): Array<Date> => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const currentMonthDays = getCurrentMonthDays();

  const firstWeekDay = currentMonthDays[0].getDay();
  const isSundayFirstDay = firstWeekDay === 0;

  const previousMonthDays: Array<Date> = [];

  if (!isSundayFirstDay) {
    const addArr = new Array(firstWeekDay)
      .fill('')
      .map((_date, i) => new Date(currentYear, month - 1, 0 - i))
      .reverse();

    previousMonthDays.push(...addArr);
  }

  const nextMonthsDays: Array<Date> = [];

  const lastDay = currentMonthDays[currentMonthDays.length - 1].getDay();
  const isSaturdayLastDay = lastDay === 6;

  if (!isSaturdayLastDay) {
    const addArr = new Array(6 - lastDay)
      .fill('')
      .map((_date, i) => new Date(currentYear, month, i + 1));
    nextMonthsDays.push(...addArr);
  }

  return [...previousMonthDays, ...currentMonthDays, ...nextMonthsDays];

  function getCurrentMonthDays() {
    return new Array(31)
      .fill('')
      .map((_date, i) => new Date(currentYear, month - 1, i + 1))
      .filter((date) => date.getMonth() === month - 1);
  }
};

export const getMonthByNumber = (month: number): string => months[month];

export const getCalendarCellValue = (
  date: Date,
  holidays: Array<Holiday> | undefined
): CalendarDay => {
  const year = date.getFullYear();
  const monthDay = date.getDate();
  const monthNumber = date.getMonth();

  const month = getMonthByNumber(monthNumber);

  let holidayInfo: Holiday | null = null;

  if (holidays) {
    const holidaysDates = holidays?.map((holiday) => {
      const fullDate = new Date(holiday.date);
      const holidayYear = fullDate.getFullYear();
      const holidayMonth = fullDate.getMonth();
      const holidayDay = fullDate.getDate();

      return {
        compareHolidayDate: new Date(holidayYear, holidayMonth, holidayDay),
        holidayDate: holiday.date,
      };
    });

    holidayInfo = holidaysDates
      .map(({ compareHolidayDate, holidayDate }) => {
        const newComparedCalendarDate = new Date(year, monthNumber, monthDay);

        const isHoliday =
          compareHolidayDate.getTime() === newComparedCalendarDate.getTime();

        if (isHoliday) {
          const holiday = holidays?.find((holiday) => holiday.date === holidayDate);
          return holiday ? holiday : null;
        }
        return null;
      })
      .filter((holiday) => !!holiday)[0];
  }

  return {
    date,
    monthDay,
    month,
    tasks: [],
    holidayInfo,
    id: date.getDay() * monthDay + date.getDate().toString() + month,
  };
};

export const getTaskAmountInfo = (allTasksLength: number): string =>
  `${allTasksLength || 0}/${3} ${allTasksLength === 1 ? 'task' : 'tasks'}`;

export const getCalendarWithNewTask = (
  calendar: Array<CalendarDay>,
  dayId: string,
  newTask: Task
) =>
  calendar.map((calendarDay) =>
    calendarDay.id === dayId
      ? { ...calendarDay, tasks: [...calendarDay.tasks, newTask] }
      : calendarDay
  );

export const getCalendarWithoutDeletedTask = (
  calendar: Array<CalendarDay>,
  dayId: string,
  taskId: string
) =>
  calendar.map((calendarDay) => {
    return calendarDay.id === dayId
      ? { ...calendarDay, tasks: getNewFilteredTasks(calendarDay.tasks, taskId) }
      : calendarDay;

    function getNewFilteredTasks(tasks: Array<Task>, taskId: string): Array<Task> {
      return tasks.filter((task) => task.taskId !== taskId);
    }
  });

export const getCalendarWithEditedTask = (
  calendar: Array<CalendarDay>,
  dayId: string,
  editedTask: Task
) =>
  calendar.map((calendarDay) => {
    return calendarDay.id === dayId
      ? { ...calendarDay, tasks: getNewEditedTasks(calendarDay.tasks, editedTask) }
      : calendarDay;

    function getNewEditedTasks(tasks: Array<Task>, newTask: Task): Array<Task> {
      return tasks.map((task) => (task.taskId === newTask.taskId ? newTask : task));
    }
  });

export const getNewCalendarAfterDragAndDrop = (
  calendarData: Array<CalendarDay>,
  pickedCalendarDay: CalendarDay,
  newPickedDay: CalendarDay,
  previousCalendarDay: CalendarDay,
  newPreviousDay: CalendarDay
) =>
  calendarData.map((calendarDay) =>
    calendarDay.id === pickedCalendarDay.id
      ? newPickedDay
      : calendarDay.id === previousCalendarDay?.id
      ? newPreviousDay
      : calendarDay
  );

export const getNewCalendarAfterTaskSwipe = (
  calendarData: Array<CalendarDay>,
  newCurrentCalendarDay: CalendarDay,
  swapCalendarDayId: string
) =>
  calendarData.map((calendarDay) =>
    calendarDay.id === swapCalendarDayId ? newCurrentCalendarDay : calendarDay
  );

export const getCalendarDayById = (
  calendarData: Array<CalendarDay>,
  calendarDayId: string
): CalendarDay | undefined => calendarData.find((day) => day.id === calendarDayId);

export const getIsValidDragAndDrop = (
  pickedCalendarDay: CalendarDay | undefined,
  pickedTask: Task | undefined,
  previousCalendarDay: CalendarDay | undefined,
  calendarDayId: string
): boolean =>
  !!(
    pickedCalendarDay &&
    pickedCalendarDay.tasks.length < 3 &&
    pickedTask &&
    previousCalendarDay &&
    previousCalendarDay.id !== calendarDayId
  ) && !pickedCalendarDay.holidayInfo;

export const getNewPreviousDay = (previousCalendarDay: CalendarDay, taskId: string) => ({
  ...previousCalendarDay,
  tasks: previousCalendarDay?.tasks.filter((task) => task.taskId !== taskId),
});

export const getNewPickedDay = (pickedCalendarDay: CalendarDay, pickedTask: Task) => ({
  ...pickedCalendarDay,
  tasks: [...pickedCalendarDay.tasks, pickedTask],
});

export const getNewCalendarDayAfterTaskSwipe = (
  currentCalendarDay: CalendarDay,
  taskIndex: number,
  swipeTaskIndex: number
) => ({
  ...currentCalendarDay,
  tasks: currentCalendarDay.tasks.map((task, index) =>
    index === taskIndex
      ? currentCalendarDay.tasks[swipeTaskIndex]
      : index === swipeTaskIndex
      ? currentCalendarDay.tasks[taskIndex]
      : task
  ),
});

export const getIsValidTaskSwipe = (
  currentCalendarDay: CalendarDay | undefined,
  taskIndex: number | undefined,
  swipeTaskIndex: number | undefined,
  targetTaskId: string,
  swapTaskId: string
) =>
  currentCalendarDay &&
  typeof taskIndex === 'number' &&
  typeof swipeTaskIndex === 'number' &&
  targetTaskId !== swapTaskId &&
  !currentCalendarDay.holidayInfo;

export const getTaskIndexById = (
  tasks: Array<Task> | undefined,
  taskId: string
): number | undefined => tasks?.findIndex((task) => task.taskId === taskId);

export const getFormattedText = (text: string): string => text.trim().toLowerCase();

export const getNewFilteredTasks = (
  tasks: Array<Task>,
  filterOption: FilterOption,
  filterValue: string | undefined
): Array<Task> => {
  if (!filterValue) return tasks;

  switch (filterOption) {
    case LABEL: {
      return tasks.filter((task) =>
        getFormattedText(task.label).includes(getFormattedText(filterValue))
      );
    }

    case COLOR: {
      return tasks.filter((task) => {
        const filterColors = getFormattedText(filterValue).split(',');
        return task.colors.some((color) => filterColors.includes(color));
      });
    }
  }
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
