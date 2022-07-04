import { useState } from "react";
import { Container, Grid, Tabs, Tab, Box } from "@mui/material";

// import SiteOptions from "components/admin/SiteOptions";
import TabPanel from "components/TabPanel";
// import ActiveCollections from "components/admin/ActiveCollections";
// import SalesOptions from "components/admin/SalesOptions";
import CoreOptions from "components/admin/core/CoreOptions";

const Admin = () => {
  const [tab, setTab] = useState(0);
  const handleTab = (e, v) => {
    setTab(v);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} pt={4} pb={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Tabs value={tab} onChange={handleTab} textColor="inherit">
              <Tab label="Site Options" id="view-tab-0" />
              <Tab label="Collections" id="view-tab-1" />
              <Tab label="Sales" id="view-tab-2" />
              <Tab label="Core" id="view-tab-3" />
            </Tabs>
          </Box>
        </Grid>
      </Grid>

      <TabPanel value={tab} index={0}>
        {/*<SiteOptions />*/}
      </TabPanel>

      <TabPanel value={tab} index={1}>
        {/*<ActiveCollections />*/}
      </TabPanel>

      <TabPanel value={tab} index={2}>
        {/*<SalesOptions />*/}
      </TabPanel>

      <TabPanel value={tab} index={3}>
        <CoreOptions />
      </TabPanel>
    </Container>
  );
};

export default Admin;
