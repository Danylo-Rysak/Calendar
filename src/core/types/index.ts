// Constants
import { COLOR, LABEL } from 'core/constants';
import { createContext, Dispatch, SetStateAction } from 'react';

export type FilterOption = typeof LABEL | typeof COLOR;

export type WrapperContextProps = {
  filterOption: FilterOption;
  filterValue: string;
  setFilterOption: Dispatch<SetStateAction<FilterOption>>;
  setFilterValue: Dispatch<SetStateAction<string>>;
};
export const WrapperContext = createContext({} as WrapperContextProps);
