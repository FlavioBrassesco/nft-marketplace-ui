import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

const StatusSelect = ({ value, change = (f) => f }) => {
  return (
    <FormControl fullWidth={true}>
      <FormLabel id="radio-status">Status</FormLabel>
      <RadioGroup
        aria-labelledby="radio-status"
        defaultValue="All"
        value={value}
        onChange={change}
        name="radio-status-group"
        row
      >
        <FormControlLabel value="All" control={<Radio />} label="All" />
        <FormControlLabel
          value="For sale"
          control={<Radio />}
          label="For sale"
        />
        <FormControlLabel value="Auction" control={<Radio />} label="Auction" />
      </RadioGroup>
    </FormControl>
  );
};

const StatusSelectToggle = ({ value, change = (f) => f }) => {
  return (
    <ToggleButtonGroup exclusive value={value} onChange={change}>
      <ToggleButton value="All">All</ToggleButton>
      <ToggleButton value="For Sale">For Sale</ToggleButton>
      <ToggleButton value="For Sale">Auction</ToggleButton>
    </ToggleButtonGroup>
  );
};

export { StatusSelect, StatusSelectToggle };
