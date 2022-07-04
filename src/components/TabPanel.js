import { Box } from "@mui/material";

export default function TabPanel(props) {
  const { children, value, index, ...other } = props;
  // {value === index && <>{children}</>}
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`view-tabpanel-${index}`}
      {...other}
    >
      {children}
    </Box>
  );
}
