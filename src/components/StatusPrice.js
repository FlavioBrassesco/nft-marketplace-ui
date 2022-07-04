import { Box, Slider, Typography, FormControl, FormLabel } from "@mui/material";
import BeautyEth from "./BeautyEth";
import { ethers } from "ethers";

const StatusPrice = ({
  label = "Price",
  values = [0, 100],
  max = 100,
  range = [0, 100],
  change = (f) => f,
}) => {
  const step = range[1].sub(range[0]).div(max);

  const stepify = (num) => ethers.BigNumber.from(num).mul(step).add(range[0]);

  const valuetext = (value) => {
    return <BeautyEth size="small" bignum={stepify(value)} />
  }

  return (
    <>
     <FormControl fullWidth={true}>
      <FormLabel id="radio-status">{label}</FormLabel>
        <Slider 
        getAriaLabel={()=>"Price"}
        value={values} onChange={change}
        valueLabelDisplay="auto"
        min={0}
        max={max}
        defaultValue={[0,max]}
        getAriaValueText={valuetext} />
      </FormControl>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Box display="flex" flexDirection="row" >
          <Typography>Min:&nbsp;</Typography>
          <BeautyEth size="small" bignum={stepify(values[0])} />
        </Box>
        <Box display="flex" flexDirection="row">
          <Typography>Max:&nbsp;</Typography>
          <BeautyEth size="small" bignum={stepify(values[1])} />
        </Box>
      </Box>
    </>
  );
};

export default StatusPrice;
