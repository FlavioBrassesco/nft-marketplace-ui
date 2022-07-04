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
import { FiChevronDown, FiSliders } from "react-icons/fi";
import { useState } from "react";

const ItemProperties = ({ properties = [] }) => {
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
        id="properties-accordion"
      >
        <SvgIcon>
          <FiSliders />
        </SvgIcon>
        <Typography ml={1}>Properties</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {properties.map((p) => (
            <ListItem key={p.name}>
              <ListItemText>
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textTransform: "uppercase" }}
                  >
                    {p.name}
                  </Typography>
                  <Stack direction="row">
                    <Typography
                      variant="subtitle2"
                      sx={{ textTransform: "uppercase" }}
                    >
                      {p.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      ({p.percentage})
                    </Typography>
                  </Stack>
                </Stack>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default ItemProperties;
