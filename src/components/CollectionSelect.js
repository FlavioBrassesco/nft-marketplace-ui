import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const CollectionSelect = ({ label, options, value, change = (f) => f }) => {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="collection-select">{label}</InputLabel>
        <Select
          labelId="collection-select"
          id="collection-select-value"
          value={value}
          label={label}
          onChange={change}
          multiple
        >
          {options.map((o, i) => (
            <MenuItem key={i} value={o}>
              {o}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CollectionSelect;
