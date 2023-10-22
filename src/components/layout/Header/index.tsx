import { FC } from 'react';
import { Button } from '@mui/material';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';
// Components
import SelectFilter from './SelectFilter';
import SearchTask from './SearchTask';
// Functions
import { getMonthByNumber } from 'utils/functions';
// Styles
import * as Styled from './styles';

const tasks = ['JSNDJS', 'SJNA', 'ASKJNALKJ', 'ASJNA', 'AJLCAL'];

const Header: FC = () => {
  const currentDate = new Date();

  const currentMonth = getMonthByNumber(currentDate.getMonth());
  const currentYear = currentDate.getFullYear();

  const currentDateInfo = `${currentMonth} ${currentYear}`;

  const downloadCalendarAsJson = () => {
    try {
      const calendarData = localStorage.getItem('calendar');

      if (calendarData) {
        const fileName = 'calendarData';

        const formattedJson = JSON.stringify(JSON.parse(calendarData), null, 6);
        const blob = new Blob([formattedJson], { type: 'application/json' });
        const href = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + '.json';
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      }
    } catch (error) {
      alert(error);
    }
  };

  const downloadCalendarAsImage = () => {
    const targetElement = document.getElementById('calendar');

    if (targetElement) {
      html2canvas(targetElement).then((canvas) => {
        const dataURL = canvas.toDataURL();
        saveAs(dataURL, 'calendar.png');
      });
    }
  };

  return (
    <Styled.Header>
      <SelectFilter />
      <SearchTask tasks={tasks} />
      <h3>{currentDateInfo}</h3>
      <Button onClick={downloadCalendarAsJson} variant="outlined">
        Download as JSON
      </Button>
      <Button onClick={downloadCalendarAsImage} variant="outlined">
        Download as image
      </Button>
    </Styled.Header>
  );
};
export default Header;
