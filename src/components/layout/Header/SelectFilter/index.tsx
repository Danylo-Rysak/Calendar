// Libs
import { FC, useState } from 'react';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

const SelectOption: FC = () => {
  const [filterName, setFilterName] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setFilterName(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="select-filter-name">Filter by</InputLabel>
        <Select
          labelId="select-filter-name"
          id="select"
          value={filterName}
          onChange={handleChange}
          label="Filter by"
        >
          <MenuItem value={10}>Label</MenuItem>
          <MenuItem value={20}>Color</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectOption;
