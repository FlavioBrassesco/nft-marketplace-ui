import {
  Grid,
  Paper,
  Stack,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";

import SaveButton from "components/SaveButton";
import CoreContracts from "./CoreContracts";
import AuthorizedMarketplaces from "./AuthorizedMarketplaces";

const CoreOptions = () => {
  return (
    <Grid container spacing={2} sx={{ py: 2 }}>
      <Grid item md={8}>
        <Paper sx={{ p: 2 }}>
          <AuthorizedMarketplaces />
        </Paper>
        <Paper sx={{ p: 2, mt: 2 }}>
          <CoreContracts />
        </Paper>
      </Grid>
      <Grid item md={4}>
        <Paper sx={{ p: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Typography variant="h6" component="h2">
              Core Functionality
            </Typography>

            <SaveButton />
          </Stack>
          <Typography variant="body2">
            Pause to protect users&rsquo; assets if something goes wrong
          </Typography>
          <FormGroup>
            <FormControlLabel control={<Switch />} label="Pause" />
          </FormGroup>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CoreOptions;
