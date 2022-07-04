import {
  Grid,
  Container,
  Typography,
  SvgIcon,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Pagination,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import CollectionCard from "components/CollectionCard";
import { FiGrid, FiList } from "react-icons/fi";

import { dataC as data } from "./data";

const Collections = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} sx={{ py: 4 }}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ textTransform: "uppercase" }}
          >
            Collections
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ToggleButtonGroup value="grid" exclusive>
              <ToggleButton value="grid">
                <SvgIcon>
                  <FiGrid />
                </SvgIcon>
              </ToggleButton>
              <ToggleButton value="list">
                <SvgIcon>
                  <FiList />
                </SvgIcon>
              </ToggleButton>
            </ToggleButtonGroup>

            <FormControl>
              <InputLabel id="collection-select">Sort by</InputLabel>
              <Select
                labelId="collection-select"
                id="collection-select-value"
                value="Collection"
                label="Sort by"
                onChange={(f) => f}
              >
                {[
                  "Collection",
                  "Volume",
                  "Items",
                  "Supply",
                  "Lowest Price",
                  "Highest Price",
                ].map((o, i) => (
                  <MenuItem key={i} value={o}>
                    {o}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>

        {data.map((d) => (
          <Grid item md={4} key={d.name}>
            <CollectionCard collection={d} />
          </Grid>
        ))}

        <Grid item xs={12} mt={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Pagination count={3} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Collections;
