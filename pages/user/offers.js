import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Switch
} from "@mui/material";
import { StatusSelectToggle } from "components/StatusSelect";
import TraitChips from "components/TraitChips";
import ItemCard from "components/ItemCard";

import { traits, data } from "../data";

const Offers = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} py={4}>
      <Grid item xs={12}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ textTransform: "uppercase" }}
          >
            My Offers
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "end",
            }}
          >
            <Stack spacing={1}>
              <Typography variant="subtitle2" color="text.secondary">
                Filter By
              </Typography>

              <Stack spacing={1} direction="row" alignItems="center">
                <FormGroup>
                  <FormControlLabel
                    control={<Switch />}
                    label="Auctions"
                  />
                </FormGroup>

                <TraitChips traits={traits} />
              </Stack>
            </Stack>

            <FormControl>
              <InputLabel id="collection-select">Sort By</InputLabel>
              <Select
                labelId="collection-select"
                id="collection-select-value"
                value="Lowest Bid"
                label="Sort By"
                onChange={(f) => f}
              >
                {["Collection", "Lowest Bid", "Highest Bid", "Token ID"].map(
                  (o, i) => (
                    <MenuItem key={i} value={o}>
                      {o}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2">161 results</Typography>
        </Grid>

        <Grid item container xs={12} spacing={2}>
          {data.map((d) => (
            <Grid item md={3} key={d.name}>
              <ItemCard nft={d} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Offers;
