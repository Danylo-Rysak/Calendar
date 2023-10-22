// Libs
import { FC } from 'react';
// Functions
import { getTaskAmountInfo } from 'core/functions';
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
  const { monthDay, tasks, holidayInfo } = calendarDay;

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const isCurrentDay = currentDay === monthDay;

  const tasksAmount = getTaskAmountInfo(tasks.length);

  return (
    <Styled.CalendarCells>
      <Styled.Header isCurrentDay={isCurrentDay}>
        <p>{monthDay}</p>
        {holidayInfo ? <p>Holiday</p> : <p>{tasksAmount}</p>}
        <Styled.AddTask src={add} alt="addIcon" />
      </Styled.Header>
      {holidayInfo && <Styled.HolidayName>{holidayInfo.localName}</Styled.HolidayName>}
    </Styled.CalendarCells>
  );
};

export default CalendarCell;
