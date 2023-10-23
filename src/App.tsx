// Libs
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// Components
import Header from 'components/layout/Header';
import Main from 'components/layout/Content';
// Store
import { DispatchType } from 'store/root';
// Actions
import { fetchCalendarData } from 'store/calendar-service/actions';

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
