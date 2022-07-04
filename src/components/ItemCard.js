import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Divider,
  Stack,
  SvgIcon,
  CardActionArea,
} from "@mui/material";
import { FaEthereum } from "react-icons/fa";

import { NextLinkComposed } from "../Link";

const ItemCard = ({ nft, ...props }) => {
  return (
    <Card>
      <CardActionArea component={NextLinkComposed} to={{ pathname: "/item" }}>
        <CardMedia
          component="img"
          height="194"
          image={nft.image}
          alt={`${nft.name} - ${nft.collection}`}
        />
        <CardContent>
          <Typography color="primary.main">{nft.collection}</Typography>
          <Typography variant="h6" component="h2">
            {nft.name}
          </Typography>
          <Divider sx={{ my: 1 }} />

          {nft.price && (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body2" color="text.secondary">
                {nft.status === "Auction" ? "Highest bid" : "Asking price"}
              </Typography>
              <Stack direction="row" alignItems="center">
                <Typography
                  variant="body2"
                  color="text.secondary"
                  lineHeight={0}
                >
                  ({`$${nft.priceUSD}`})
                </Typography>

                <Typography color="primary.main" lineHeight={0}>
                  <FaEthereum />
                </Typography>

                <Typography variant="h6">{nft.price}</Typography>
              </Stack>
            </Stack>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ItemCard;
