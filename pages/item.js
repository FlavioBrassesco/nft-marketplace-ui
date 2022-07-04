import ItemBanner from "components/ItemBanner";
import ItemProperties from "components/ItemProperties";
import ItemDetails from "components/ItemDetails";
import ItemHistory from "components/ItemHistory";
import ItemManage from "components/ItemManage";
import ItemCard from "components/ItemCard";
import { Container, Grid, Typography } from "@mui/material";

import { data, history, properties, details } from "./data";

const Item = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} component="main" sx={{ py: 4 }}>
        <Grid item xs={12}>
          <ItemBanner />
        </Grid>
        <Grid item xs={12} container spacing={2}>
          <Grid item sm={4}>
            <ItemManage />
            <ItemProperties properties={properties} />
            <ItemDetails details={details} />
          </Grid>
          <Grid item sm={8}>
            <ItemHistory history={history} />
          </Grid>
        </Grid>
        <Grid item xs={12} mt={4} mb={1}>
          <Typography variant="h5" component="h3">
            More from this collection
          </Typography>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          {data.map((nft) => (
            <Grid md={3} key={nft.name} item>
              <ItemCard nft={nft} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Item;
