// Libs
import { FC, useEffect } from 'react';
// Components
import Header from 'components/layout/Header';
import Main from 'components/layout/Content';
import { fetchCalendarData } from './store/calendar-service/actions';
import { DispatchType } from './store/root';
import { useDispatch } from 'react-redux';

const App: FC = () => {
  const dispatch: DispatchType = useDispatch();

  useEffect(() => {
    dispatch(fetchCalendarData());
  }, []);

  return (
    <div>
      <Header />
      <Main />
    </div>
  );
};

export default App;
