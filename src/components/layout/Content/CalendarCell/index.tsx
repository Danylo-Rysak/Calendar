// Libs
import { FC, useState, DragEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import TaskItem from '../TaskItem';
import AddTaskModal from './AddTaskModal';
// Functions
import {
  getCalendarDayById,
  getIsValidDragAndDrop,
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
import { CalendarDay } from 'store/calendar-service/interfaces';
// Styles
import * as Styled from './styles';

interface CalendarCellProps {
  calendarDay: CalendarDay;
}

const CalendarCell: FC<CalendarCellProps> = ({ calendarDay }) => {
  const [isOpenAddTaskModal, setIsOpenAddTaskModal] = useState<boolean>(false);

  const toggleOpenAddTaskModalClick = (isOpen: boolean) => () => {
    setIsOpenAddTaskModal(isOpen);
  };

  const { monthDay, tasks, holidayInfo } = calendarDay;

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const isCurrentDay = currentDay === monthDay;

  const tasksAmount = getTaskAmountInfo(tasks.length);

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
          <Styled.AddTask
            onClick={toggleOpenAddTaskModalClick(true)}
            src={add}
            alt="addIcon"
          />
        </Styled.Header>
        {holidayInfo ? (
          <Styled.HolidayName>{holidayInfo.localName}</Styled.HolidayName>
        ) : (
          <Styled.Content>
            {tasks.map((task) => (
              <TaskItem key={task?.taskId} task={task} calendarDay={calendarDay} />
            ))}
          </Styled.Content>
        )}
      </Styled.CalendarCells>
    </>
  );
};

export default CalendarCell;
