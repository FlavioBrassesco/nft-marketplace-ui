import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  CardActionArea,
  Avatar,
} from "@mui/material";
import { FaEthereum } from "react-icons/fa";

import { NextLinkComposed } from "../Link";

const CollectionCard = ({ collection, ...props }) => {
  return (
    <Card>
      <CardActionArea component={NextLinkComposed} to={{ pathname: "/collection"}}>
        <CardMedia
          component="img"
          height="150"
          image={collection.banner}
          alt={collection.name}
        />
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Avatar
              src={collection.avatar}
              alt={collection.name}
              sx={{ width: 125, height: 125, borderColor:"common.white", borderStyle:"solid", borderWidth:"6px", marginTop:"-55px", marginLeft:"-6px" }}
              edge="start"
            />

            <Stack alignItems="end">
              <Typography variant="h6" component="h2" color="primary.main" textAlign="right">
                {collection.name}
              </Typography>
              <Stack direction="row" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Volume
                </Typography>
                <Typography color="primary.main" lineHeight={0}>
                  <FaEthereum />
                </Typography>
                <Typography variant="h6" component="p">
                  {collection.volume}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CollectionCard;
