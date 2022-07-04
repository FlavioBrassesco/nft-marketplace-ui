import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Avatar,
  Grid,
  Box,
} from "@mui/material";

const CollectionBanner = () => {
  return (
    <Card>
      <CardMedia
        src="https://picsum.photos/seed/monstruito/1200/1200"
        alt="NFT"
        component="img"
        height={220}
      />

      <CardContent sx={{ p: 4 }}>
        <Grid container>
          <Grid item xs={12}>
            <Avatar
              src="https://picsum.photos/seed/monstruitso/1200/1200"
              alt="NFT"
              sx={{
                width: 120,
                height: 120,
                marginTop: "-100px",
                borderWidth: "6px",
                borderColor: "common.white",
                borderStyle: "solid",
                marginLeft: "-6px",
              }}
            />
          </Grid>
          <Grid item container xs={12} alignItems="center" mt={1} spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h2">NFT NAME #1020</Typography>

              <Typography color="text.secondary" my={2}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                textAlign="center"
                justifyContent="space-around"
                sx={{
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "grey.400",
                  p:1,
                  borderRadius:4
                }}
              >
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Items
                  </Typography>
                  <Typography variant="h6" component="p" color="primary.main">
                    500
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Items Listed
                  </Typography>
                  <Typography variant="h6" component="p" color="primary.main">
                    120
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Volume(ETH)
                  </Typography>
                  <Typography variant="h6" component="p" color="primary.main">
                    71.89
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Lowest Price(ETH)
                  </Typography>
                  <Typography variant="h6" component="p" color="primary.main">
                    0.259
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CollectionBanner;
