// Libs
import { FC, useState } from 'react';
// Functions
import { getTaskAmountInfo } from 'core/functions';
// Icons
import add from 'assets/icons/add.svg';
// Interfaces
import { CalendarDay } from 'store/calendar-service/interfaces';
// Styles
import * as Styled from './styles';
import AddTaskModal from './AddTaskModal';
import TaskItem from '../TaskItem';

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

  return (
    <>
      <AddTaskModal
        dayId={calendarDay.id}
        isOpen={isOpenAddTaskModal}
        onClose={toggleOpenAddTaskModalClick(false)}
      />
      <Styled.CalendarCells>
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
              <TaskItem key={task?.taskId} task={task} />
            ))}
          </Styled.Content>
        )}
      </Styled.CalendarCells>
    </>
  );
};

export default CalendarCell;
