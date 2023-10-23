// Libs
import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
// Components
import CalendarCell from './CalendarCell';
// Styles
import * as Styled from './styles';
import { useSelector } from 'react-redux';
import { getCalendarDataSelector } from '../../../store/calendar-service/selectors';

const Content: FC = () => {
  const calendarData = useSelector(getCalendarDataSelector);

  return (
    <Styled.Content id="calendar">
      {calendarData.data.map((calendarDay) => (
        <CalendarCell key={uuidv4()} calendarDay={calendarDay} />
      ))}
    </Styled.Content>
  );
};

export default Content;
