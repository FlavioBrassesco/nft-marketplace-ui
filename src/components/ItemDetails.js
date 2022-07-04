import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  SvgIcon,
  Stack,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { useState } from "react";

const ItemDetails = ({ details }) => {
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
        id="details-accordion"
      >
        <SvgIcon>
          <FiSearch />
        </SvgIcon>
        <Typography ml={1}>Details</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          <ListItem>
            <ListItemText>
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textTransform: "uppercase" }}
                >
                  Contract Address
                </Typography>

                <Typography
                  variant="subtitle2"
                  sx={{ textTransform: "uppercase", textDecoration: "none" }}
                  component="a"
                  color="text.primary"
                  href="#"
                >
                  {details.address}
                </Typography>
              </Stack>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textTransform: "uppercase" }}
                >
                  IPFS JSON
                </Typography>

                <Typography
                  variant="subtitle2"
                  component="a"
                  href="#"
                  color="text.primary"
                  sx={{ textDecoration: "none" }}
                >
                  {details.ipfsJson}
                </Typography>
              </Stack>
            </ListItemText>
          </ListItem>
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default ItemDetails;
