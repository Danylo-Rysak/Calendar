// Libs
import { FC } from 'react';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
// Functions
import { capitalizeFirstLetter } from 'core/functions';

interface SelectProps {
  options: Array<string>;
  label: string;
  handleChange: (el: string) => void;
}

const SelectFilter: FC<SelectProps> = ({ options, label, handleChange }) => {
  const onChangeHandler = (event: SelectChangeEvent) => {
    handleChange(event.target.value);
  };

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="select-filter-name">{label}</InputLabel>

      <Select
        labelId="select-filter-name"
        id="select"
        label={label}
        value={options[0]}
        onChange={onChangeHandler}
      >
        {options.map((option, index) => (
          <MenuItem value={option} key={index}>
            {capitalizeFirstLetter(option)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectFilter;
