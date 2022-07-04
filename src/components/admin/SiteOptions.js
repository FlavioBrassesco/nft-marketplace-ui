import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { SiteOptions as SiteOptionsContext } from "contexts/SiteOptions";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Paper,
  Stack,
  Typography,
  TextField,
  Box,
  Button,
  InputAdornment,
  SvgIcon,
} from "@mui/material";
import {
  FaDiscord,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaMedium,
} from "react-icons/fa";
import SaveButton from "../SaveButton";

const Input = styled("input")({
  display: "none",
});

const SiteOptions = () => {
  const { loading, error, data, fetchOptions, updateOptions } =
    useContext(SiteOptionsContext);

  const [socialLinks, setSocialLinks] = useState(null);

  useEffect(() => {
    !data && fetchOptions();
  }, [data, fetchOptions]);

  useEffect(() => {
    const links = {};
    data &&
      data.socialLinks.forEach((d) => {
        links[d.name] = d.url;
      });
    setSocialLinks(links);
  }, [data]);

  console.log(socialLinks);
  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <Grid container spacing={2} sx={{ py: 2 }}>
          <Grid item md={6}>
            <Paper sx={{ p: 2 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 2 }}
              >
                <Typography variant="h6" component="h2">
                  Site Options
                </Typography>
                <SaveButton />
              </Stack>

              <Grid container spacing={2}>
                <Grid item md={8}>
                  <Stack spacing={2}>
                    <TextField
                      label="Site Title"
                      id="site-title-option"
                      fullWidth
                      defaultValue={data.options.title}
                    />
                    <TextField
                      label="Site Description"
                      id="site-description-option"
                      fullWidth
                      multiline
                      minRows={4}
                      maxRows={5}
                      defaultValue={data.options.description}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={4}>
                  <Stack alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        width: "140px",
                        height: "140px",
                        backgroundColor: "grey.200",
                      }}
                    >
                      <Image
                        src={data.options.logoURL}
                        width={140}
                        height={140}
                        alt="logo"
                      />
                    </Box>
                    <label htmlFor="site-logo-option">
                      <Input
                        accept="image/*"
                        id="site-logo-option"
                        multiple
                        type="file"
                      />
                      <Button variant="outlined">Upload Logo</Button>
                    </label>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item md={6}>
            <Paper sx={{ p: 2 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 2 }}
              >
                <Typography variant="h6" component="h2">
                  Terms & Conditions
                </Typography>
                <SaveButton />
              </Stack>
              <TextField
                multiline
                minRows={7}
                maxRows={10}
                label="Terms & Conditions"
                id="site-terms-option"
                fullWidth
                defaultValue={data.terms}
              />
            </Paper>
          </Grid>
          <Grid item md={6}>
            <Paper sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="h6" component="h2">
                      Social Links
                    </Typography>
                    <SaveButton />
                  </Stack>
                </Grid>
                <Grid item md={6}>
                  <TextField
                    label="Discord"
                    id="site-discord-option"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon>
                            <FaDiscord />
                          </SvgIcon>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    label="Instagram"
                    id="site-instagram-option"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon>
                            <FaInstagram />
                          </SvgIcon>
                        </InputAdornment>
                      ),
                    }}
                    value={socialLinks ? socialLinks.instagram : "nada"}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    label="Twitter"
                    id="site-twitter-option"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon>
                            <FaTwitter />
                          </SvgIcon>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    label="Github"
                    id="site-github-option"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon>
                            <FaGithub />
                          </SvgIcon>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    label="Medium"
                    id="site-medium-option"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon>
                            <FaMedium />
                          </SvgIcon>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default SiteOptions;
