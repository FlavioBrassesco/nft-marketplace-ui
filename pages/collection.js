import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Tabs,
  Tab,
} from "@mui/material";
import CollectionBanner from "components/CollectionBanner";
import ItemCard from "components/ItemCard";
import TabPanel from "components/TabPanel";
import { StatusSelectToggle } from "components/StatusSelect";
import TraitChips from "components/TraitChips";
import TraitAccordions from "components/TraitAccordions";
import ActivityLog from "components/ActivityLog";

import { data, traits, history } from "./data";

const Collection = () => {
  const [tab, setTab] = useState(0);

  const handleTab = (e, v) => {
    setTab(v);
  };

  return (
    <Container maxWidth="lg">
      <Stack alignItems="center" spacing={2} py={4}>
        <CollectionBanner />

        <Tabs value={tab} onChange={handleTab}>
          <Tab label="Items" id="view-tab-0" />
          <Tab label="Traits" id="view-tab-1" />
          <Tab label="Activity" id="view-tab-2" />
        </Tabs>
      </Stack>

      <TabPanel mb={4} value={tab} index={0}>
        <Grid container spacing={2}>
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
                  <StatusSelectToggle value={"All"} />

                  <TraitChips traits={traits} />
                </Stack>
              </Stack>

              <FormControl>
                <InputLabel id="collection-select">Sort By</InputLabel>
                <Select
                  labelId="collection-select"
                  id="collection-select-value"
                  value="Lowest Price"
                  label="Sort By"
                  onChange={(f) => f}
                >
                  {["Lowest Price", "Highest Price", "Token ID"].map((o, i) => (
                    <MenuItem key={i} value={o}>
                      {o}
                    </MenuItem>
                  ))}
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
      </TabPanel>

      <TabPanel value={tab} index={1} mb={4}>
        <TraitAccordions traits={traits} />
      </TabPanel>

      <TabPanel value={tab} index={2} mb={4}>
        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <Typography variant="subtitle2">Filter By</Typography>
          {["Listed", "Delisted", "Sold", "Modified"].map((e) => (
            <Chip
              label={e}
              key={e}
              variant="outlined"
              onClick={(f) => f}
              onDelete={null}
            />
          ))}
        </Stack>

        <ActivityLog history={history} item={true} />
      </TabPanel>
    </Container>
  );
};

export default Collection;
