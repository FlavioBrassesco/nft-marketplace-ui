import {
  Container,
  TextField,
  Button,
  Paper,
  Grid,
  Stack,
  Typography
} from "@mui/material";

const Funds = () => {
  return (
    <Container maxWidth="xs">
      <Grid container spacing={2} my={4}>
        <Grid item xs={12}>
          <Stack component={Paper} sx={{ p: 4 }} spacing={2}>
          <Typography variant="subtitle2">You have 0.100<sup>eth</sup> available for withdrawal</Typography>
            <TextField
              id="standard-number"
              label="Amount"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
            <Button variant="contained">Withdraw</Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Funds;
