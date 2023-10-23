// Libs
import { FC, ReactNode } from 'react';
import FormControl from '@mui/material/FormControl';
import {
  Checkbox,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  OutlinedInput,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface MultiSelectProps {
  value: Array<string>;
  onChange: (event: SelectChangeEvent<string[]>, child: ReactNode) => void;
  options: Array<string>;
}

const MultiSelect: FC<MultiSelectProps> = ({ value, onChange, options }) => {
  return (
    <>
      <FormControl sx={{ m: 1, width: '100%' }}>
        <InputLabel id="checkbox-label">Colors</InputLabel>
        <Select
          labelId="checkbox-label"
          id="colors"
          name="colors"
          multiple
          value={value}
          onChange={onChange}
          input={<OutlinedInput label="Colors" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              <Checkbox checked={value.includes(option)} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default MultiSelect;
