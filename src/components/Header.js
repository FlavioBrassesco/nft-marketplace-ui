import { useState, useContext } from "react";
import Web3Context from "contexts/Web3Provider";
import md5 from "crypto-js/md5";

import {
  AppBar,
  Avatar,
  Toolbar,
  Tooltip,
  IconButton,
  Box,
  Badge,
  Container,
  Menu,
  MenuItem,
  Button,
  Typography,
  Tabs,
  Tab,
  Divider,
  Stack,
  SvgIcon,
} from "@mui/material";
import { NextLinkComposed } from "../Link";

import Logo from "./vercel.svg";
import MetamaskLogo from "./metamask.svg";
import { FiDollarSign, FiKey } from "react-icons/fi";

import styles from "styles/Header.module.css";

const Header = () => {
  const { address, connect, disconnect } = useContext(Web3Context);

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [tab, setTab] = useState(0);

  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };
  const handleCloseUserMenu = (i) => () => {
    if (i !== undefined) setTab(i);
    setAnchorElUser(null);
  };

  const handleDisconnect = () => {
    setAnchorElUser(null);
    disconnect();
  };

  const handleConnect = (e) => {
    setAnchorElUser(null);
    connect();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" spacing={1}>
            <Logo className={styles.logo} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                color: "inherit",
                fontWeight: 700,
              }}
            >
              NFT Marketplace
            </Typography>
          </Stack>

          <Box>
            <Tabs
              value={tab}
              onChange={(e, v) => setTab(v)}
              textColor="inherit"
            >
              <Tab
                label="Overview"
                component={NextLinkComposed}
                to={{ pathname: "/" }}
                id="view-tab-0"
              />
              <Tab
                label="Collections"
                component={NextLinkComposed}
                to={{ pathname: "/collections" }}
                id="view-tab-1"
              />
              <Tab
                label="Activity"
                component={NextLinkComposed}
                to={{ pathname: "/activity" }}
                id="view-tab-2"
              />
            </Tabs>
          </Box>

          <Box>
            {!address ? (
              <Button onClick={handleConnect} sx={{ color: "inherit" }}>
                <MetamaskLogo className={styles["metamask-logo"]} />
                <Typography noWrap sx={{ ml: 1 }}>
                  Connect Metamask
                </Typography>
              </Button>
            ) : (
              <>
                <Tooltip title="User account">
                  <IconButton onClick={handleOpenUserMenu}>
                    <Badge color="secondary" badgeContent={<FiDollarSign />}>
                      <Avatar
                        alt={address}
                        src={`https://www.gravatar.com/avatar/${md5(
                          address
                        )}?d=retro&f=y&s=128`}
                      />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Menu
                  id="user-account"
                  anchorEl={anchorElUser}
                  keepMounted
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu()}
                >
                  <MenuItem
                    onClick={handleCloseUserMenu(6)}
                    component={NextLinkComposed}
                    to={{ pathname: "/user/admin" }}
                    disabled={tab === 6}
                  >
                    <SvgIcon sx={{ mr: 1, color: "text.secondary" }}>
                      <FiKey />
                    </SvgIcon>
                    Admin
                  </MenuItem>

                  <MenuItem
                    onClick={handleCloseUserMenu(3)}
                    component={NextLinkComposed}
                    to={{ pathname: "/user/items" }}
                    disabled={tab === 3}
                  >
                    My Nfts
                  </MenuItem>
                  <MenuItem
                    onClick={handleCloseUserMenu(4)}
                    component={NextLinkComposed}
                    to={{ pathname: "/user/offers" }}
                    disabled={tab === 4}
                  >
                    My Offers
                  </MenuItem>
                  <Divider />

                  <MenuItem
                    onClick={handleCloseUserMenu(5)}
                    component={NextLinkComposed}
                    to={{ pathname: "/user/funds" }}
                    disabled={tab === 5}
                  >
                    Withdraw Funds
                  </MenuItem>
                  <Divider />

                  <MenuItem onClick={handleDisconnect}>Disconnect</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
