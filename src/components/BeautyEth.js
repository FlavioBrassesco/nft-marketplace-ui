import { ethers } from "ethers";
import { Typography } from "@mui/material";
const baseUnits = [
  {
    name: "wei",
    display: "wei",
    start: ethers.BigNumber.from(0),
    end: ethers.utils.parseUnits("1.0", "kwei"),
  },
  {
    name: "kwei",
    display: "kwei",
    start: ethers.utils.parseUnits("1.0", "kwei"),
    end: ethers.utils.parseUnits("1.0", "mwei"),
  },
  {
    name: "mwei",
    display: "mwei",
    start: ethers.utils.parseUnits("1.0", "mwei"),
    end: ethers.utils.parseUnits("1.0", "gwei"),
  },
  {
    name: "gwei",
    display: "gwei",
    start: ethers.utils.parseUnits("1.0", "gwei"),
    end: ethers.utils.parseUnits("1.0", "szabo"),
  },
  {
    name: "szabo",
    display: "twei",
    start: ethers.utils.parseUnits("1.0", "szabo"),
    end: ethers.utils.parseUnits("1.0", "finney"),
  },
  {
    name: "ether",
    display: "eth",
    start: ethers.utils.parseUnits("1.0", "finney"),
    end: ethers.BigNumber.from(2).pow(256),
  },
];

const BeautyEth = ({bignum, ...props}) => {
  const f = baseUnits.find((b) => {
    return b.start.lte(bignum) && b.end.gt(bignum);
  });
  let num = (+ethers.utils.formatUnits(bignum, f.name)).toFixed(2);

  if (f.name === "ether") {
    if (bignum.lt(ethers.utils.parseEther("1.0")))
        num = (+ethers.utils.formatUnits(bignum, f.name)).toFixed(4);  
  }
  return (
    <Typography {...props}>
      {num}<sup className="unit">{f.display}</sup>
    </Typography>
  );
  
};

export default BeautyEth;
