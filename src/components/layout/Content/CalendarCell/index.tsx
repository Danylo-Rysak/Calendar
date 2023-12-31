// Libs
import { FC, useState, DragEvent, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import TaskItem from './TaskItem';
import AddTaskModal from './AddTaskModal';
// Functions
import {
  getCalendarDayById,
  getIsValidDragAndDrop,
  getNewFilteredTasks,
  getNewPickedDay,
  getNewPreviousDay,
  getTaskAmountInfo,
} from 'core/functions';
// Store
import { DispatchType } from 'store/root';
import { dragAndDropTask } from 'store/calendar-service/reducer';
// Selectors
import { getCalendarDataSelector } from 'store/calendar-service/selectors';
// Icons
import add from 'assets/icons/add.svg';
// Interfaces
import { CalendarDay, Task } from 'store/calendar-service/interfaces';
// Types
import { WrapperContext } from 'core/types';
// Styles
import * as Styled from './styles';
import { monthMap } from './helpers';

interface CalendarCellProps {
  calendarDay: CalendarDay;
}

const CalendarCell: FC<CalendarCellProps> = ({ calendarDay }) => {
  const [isFiltering, setIsFiltering] = useState<boolean>(true);

  const { monthDay, tasks, holidayInfo, date, month } = calendarDay;

  const [filteredTasks, setFilteredTasks] = useState<Array<Task>>(tasks);
  const [isOpenAddTaskModal, setIsOpenAddTaskModal] = useState<boolean>(false);

  const { filterOption, filterValue } = useContext(WrapperContext);

  useEffect(() => {
    const newFilteredTasks = getNewFilteredTasks(tasks, filterOption, filterValue);
    setFilteredTasks(newFilteredTasks);
    setIsFiltering(false);
  }, [tasks, filterOption, filterValue]);

  const toggleOpenAddTaskModalClick = (isOpen: boolean) => () => {
    setIsOpenAddTaskModal(isOpen);
  };

  console.log(date);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const isCurrentDay = currentDay === monthDay && currentMonth === monthMap[month];

  const tasksAmount = getTaskAmountInfo(tasks?.length);

  const dispatch: DispatchType = useDispatch();

  const calendarData = useSelector(getCalendarDataSelector);

  const handleDragAndDropUpdate = (taskId: string, calendarDayId: string) => {
    const pickedCalendarDay = getCalendarDayById(calendarData.data, calendarDayId);
    const previousCalendarDay = calendarData.data.find((calendarDay) =>
      calendarDay.tasks.find((task) => task.taskId === taskId)
    );
    const pickedTask = previousCalendarDay?.tasks.find(
      (calendarTask) => calendarTask.taskId === taskId
    );

    const isValidDragAndDrop = getIsValidDragAndDrop(
      pickedCalendarDay,
      pickedTask,
      previousCalendarDay,
      calendarDayId
    );

    if (pickedCalendarDay && pickedTask && previousCalendarDay && isValidDragAndDrop) {
      const newPreviousDay = getNewPreviousDay(previousCalendarDay, taskId);
      const newPickedDay = getNewPickedDay(pickedCalendarDay, pickedTask);

      const dragAndDropData = {
        pickedCalendarDay,
        newPickedDay,
        previousCalendarDay,
        newPreviousDay,
      };

      dispatch(dragAndDropTask(dragAndDropData));
    }
  };

  const onCalendarCellDragOverHandler = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onCalendarCellDropHandler = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('id');
    handleDragAndDropUpdate(id, calendarDay.id);
  };

  return (
    <>
      <AddTaskModal
        dayId={calendarDay.id}
        isOpen={isOpenAddTaskModal}
        onClose={toggleOpenAddTaskModalClick(false)}
      />

      <Styled.CalendarCells
        onDragOver={onCalendarCellDragOverHandler}
        onDrop={onCalendarCellDropHandler}
      >
        <Styled.Header isCurrentDay={isCurrentDay}>
          <p>{monthDay}</p>

          {holidayInfo ? <p>Holiday</p> : <p>{tasksAmount}</p>}

          <Styled.AddTaskButton
            disabled={!!holidayInfo || tasks?.length === 3}
            onClick={toggleOpenAddTaskModalClick(true)}
          >
            <Styled.AddTask src={add} alt="addIcon" />
          </Styled.AddTaskButton>
        </Styled.Header>

        {holidayInfo ? (
          <Styled.HolidayName>{holidayInfo.localName}</Styled.HolidayName>
        ) : (
          <Styled.Content>
            {!isFiltering &&
              filteredTasks.map((task) => (
                <TaskItem key={task?.taskId} task={task} calendarDay={calendarDay} />
              ))}
          </Styled.Content>
        )}
      </Styled.CalendarCells>
    </>
  );
};

export default CalendarCell;
