// Libs
import { FC, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
// Components
import CalendarCell from './CalendarCell';
// Selectors
import { getCalendarDataSelector } from 'store/calendar-service/selectors';
// Styles
import * as Styled from './styles';
import { useSelector } from 'react-redux';

const Content: FC = () => {
  const calendarData = useSelector(getCalendarDataSelector);

  useEffect(() => {
    if (calendarData.total >= 1) {
      const stringifiesCalendarData = JSON.stringify(calendarData);
      try {
        localStorage.setItem('calendar', stringifiesCalendarData);
      } catch (error) {
        console.log(error);
      }
    }
  }, [calendarData]);

  return (
    <Styled.Content id="calendar">
      {calendarData?.data.map((calendarDay) => (
        <CalendarCell key={uuidv4()} calendarDay={calendarDay} />
      ))}
    </Styled.Content>
  );
};

export default Content;
