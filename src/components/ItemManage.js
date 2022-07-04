import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  SvgIcon,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import {
  FiChevronDown,
  FiSettings,
  FiDollarSign,
  FiBarChart,
  FiEdit3,
  FiSend,
  FiX,
} from "react-icons/fi";
import { useState } from "react";

const ItemManage = () => {
  const [expanded, setExpanded] = useState(true);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion expanded={expanded}>
      <AccordionSummary
        onClick={handleClick}
        expandIcon={
          <SvgIcon>
            <FiChevronDown />
          </SvgIcon>
        }
        id="manage-accordion"
      >
        <SvgIcon>
          <FiSettings />
        </SvgIcon>
        <Typography ml={1}> Manage</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          <ListSubheader>Marketplace</ListSubheader>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SvgIcon>
                  <FiDollarSign />
                </SvgIcon>
              </ListItemIcon>

              <ListItemText>Sell</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SvgIcon>
                  <FiBarChart />
                </SvgIcon>
              </ListItemIcon>

              <ListItemText>Auction</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton disabled>
              <ListItemIcon>
                <SvgIcon>
                  <FiEdit3 />
                </SvgIcon>
              </ListItemIcon>

              <ListItemText>Modify</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton disabled>
              <ListItemIcon>
                <SvgIcon>
                  <FiX />
                </SvgIcon>
              </ListItemIcon>

              <ListItemText>Cancel</ListItemText>
            </ListItemButton>
          </ListItem>

          <Divider />
          <ListSubheader>Ownership</ListSubheader>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SvgIcon>
                  <FiSend />
                </SvgIcon>
              </ListItemIcon>

              <ListItemText>Transfer</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default ItemManage;
