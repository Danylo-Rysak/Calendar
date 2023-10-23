// Libs
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// Components
import Header from 'components/layout/Header';
import Main from 'components/layout/Content';
// Store
import { DispatchType } from 'store/root';
// Actions
import { fetchCalendarData } from 'store/calendar-service/actions';
// Types
import { FilterOption, WrapperContext, WrapperContextProps } from 'core/types';
// Constants
import { LABEL } from 'core/constants';

const App: FC = () => {
  const [filterOption, setFilterOption] = useState<FilterOption>(LABEL);
  const [filterValue, setFilterValue] = useState<string>('');

  const wrapperValueContext: WrapperContextProps = {
    filterOption,
    filterValue,
    setFilterOption,
    setFilterValue,
  };

  const dispatch: DispatchType = useDispatch();

  useEffect(() => {
    dispatch(fetchCalendarData());
  }, []);

  return (
    <WrapperContext.Provider value={wrapperValueContext}>
      <Header />
      <Main />
    </WrapperContext.Provider>
  );
};

export default App;
