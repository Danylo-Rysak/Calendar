// Libs
import { FC } from 'react';
import { Autocomplete, TextField } from '@mui/material';

interface AutocompleteProps {
  tasks: Array<string>;
}

const SearchTask: FC<AutocompleteProps> = ({ tasks }) => {
  return (
    <Autocomplete
      style={{ width: '250px' }}
      id="search-task"
      options={tasks.map((task) => task)}
      renderInput={(params) => <TextField {...params} label="Search task" />}
    />
  );
};

export default SearchTask;
