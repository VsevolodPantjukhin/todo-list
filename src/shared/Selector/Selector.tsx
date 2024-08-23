import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type SelectorProps = {
  label: string;
  value: string;
  options: any[];
  handleChange: (event: SelectChangeEvent) => void;
};

export const Selector = ({
  label,
  value,
  options,
  handleChange,
}: SelectorProps) => {
  return (
    <Box mt={5} sx={{ minWidth: 120, width: '20%' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleChange}
        >
          {options.map((item) => (
            <MenuItem value={item.value}>{item.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
