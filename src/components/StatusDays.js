import { Box, Slider, Typography, FormControl, FormLabel } from "@mui/material";

const StatusDays = ({
  label = "Ends in",
  value = 7,
  max = 7,
  change = (f) => f,
}) => {
  const valuetext = (value) => {
    return value > 1 ? `${value} Days` : `${value} Day`;
  };

  return (
    <>
      <FormControl fullWidth={true}>
        <FormLabel id="radio-status">{label}</FormLabel>
        <Slider
          aria-label="Ends in"
          defaultValue={max}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          step={1}
          min={1}
          max={max}
          marks
          onChange={change}
          value={value}
        />
      </FormControl>
      <Box>
        <Typography>
          {value} {value > 1 ? "Days" : "Day"}
        </Typography>
      </Box>
    </>
  );
};

export default StatusDays;
