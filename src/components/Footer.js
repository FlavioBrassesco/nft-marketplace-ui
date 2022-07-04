import { Box, Grid, Stack, Link as Anchor, Container } from "@mui/material";
import { FaInstagram, FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = (props) => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        py: 2,
        marginTop: "auto",
        backgroundColor: "common.white",
        boxShadow:
          "0px -2px 4px -1px rgba(0,0,0,0.2),0px -4px 5px 0px rgba(0,0,0,0.14),0px -1px 10px 0px rgba(0,0,0,0.12)"
      }}
    >
      <Container maxWidth="lg">
        <Grid container sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Anchor href="#" sx={{ textDecoration: "none" }}>
              Terms & conditions
            </Anchor>
          </Grid>
          <Grid item>
            <Stack direction="row" spacing={1}>
              <Anchor href="#" variant="h6">
                <FaInstagram />
              </Anchor>
              <Anchor href="#" variant="h6">
                <FaTwitter />
              </Anchor>
              <Anchor href="#" variant="h6">
                <FaDiscord />
              </Anchor>
              <Anchor href="#" variant="h6">
                <FaGithub />
              </Anchor>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
