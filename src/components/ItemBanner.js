import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Stack,
  Tooltip,
  Avatar,
  IconButton,
  SvgIcon,
} from "@mui/material";
import md5 from "crypto-js/md5";
import { FaEthereum } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

const ItemBanner = () => {
  return (
    <Card sx={{ display: "flex", alignItems: "center" }}>
      <CardContent sx={{ p: 4 }}>
        <header>
          <Typography
            variant="h5"
            href="#"
            component="a"
            color="primary.main"
            sx={{ textDecoration: "none" }}
          >
            Collection name
          </Typography>
          <Typography variant="h2">NFT NAME #1020</Typography>
        </header>
        <Typography color="text.secondary" my={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>

        <Stack mb={2}>
          <Typography color="text.secondary">Price</Typography>
          <Stack direction="row" alignItems="center">
            <Typography lineHeight={0} color="primary.main">
              <SvgIcon>
                <FaEthereum />
              </SvgIcon>
            </Typography>
            <Typography variant="h5" component="p" mr={1}>
              0,85
            </Typography>
            <Typography color="text.secondary" mr={2}>
              (~80,32 USD)
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={
                <SvgIcon>
                  <FiShoppingCart />
                </SvgIcon>
              }
            >
              Buy
            </Button>
          </Stack>
        </Stack>

        <Stack>
          <Typography color="text.secondary" size="small" variant="body2">
            Owner
          </Typography>
          <Stack direction="row" alignItems="center">
            <Tooltip title="Owner">
              <IconButton href="#" edge="start" size="small">
                <Avatar
                  alt={"0x000"}
                  src={`https://www.gravatar.com/avatar/${md5(
                    0x000
                  )}?d=retro&f=y&s=128`}
                  sx={{ width: 24, height: 24 }}
                />
              </IconButton>
            </Tooltip>
            <Typography
              component="a"
              href="#"
              color="text.secondary"
              sx={{ textDecoration: "none" }}
              variant="body2"
            >
              0x80...2001
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <CardMedia
        src="https://picsum.photos/seed/stories/700/700"
        alt="NFT"
        component="img"
      />
    </Card>
  );
};

export default ItemBanner;
