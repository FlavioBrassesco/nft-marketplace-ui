import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Box sx={{ minHeight: "100vh", display:"flex", flexDirection:"column" }}>
      <Header />
      {children}
      <Footer />
    </Box>
  );
};

export default Layout;
