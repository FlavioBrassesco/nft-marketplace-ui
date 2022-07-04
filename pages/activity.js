import {
  Grid,
  Container,
  Typography,
  Stack,
  Chip,
  Paper,
  Box,
  Button,
} from "@mui/material";
import ActivityLog from "components/ActivityLog";

import { history } from "./data";

const Activity = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} sx={{ py: 4 }}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ textTransform: "uppercase" }}
          >
            Activity
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="subtitle2">Filter By</Typography>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
              <Stack direction="row" spacing={1}>
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
              <Button variant="contained">Refresh</Button>
            </Stack>

            <ActivityLog history={history} item={true} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Activity;
