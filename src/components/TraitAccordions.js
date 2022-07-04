import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  SvgIcon,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";

import { FiChevronDown } from "react-icons/fi";

const TraitAccordions = ({ traits = [] }) => {
  const [tAcc, setTAcc] = useState([...Array(traits.length)].fill(true));

  const getHandleTAcc = (i) => () => {
    const nAcc = [...tAcc];
    nAcc[i] = !nAcc[i];
    setTAcc(nAcc);
  };

  useEffect(() => {
    setTAcc([...Array(traits.length)].fill(true));
  }, [traits.length]);

  return (
    <>
      {traits.map((t, i) => (
        <Accordion expanded={tAcc[i]}  key={t.name}>
          <AccordionSummary onClick={getHandleTAcc(i)}
            expandIcon={
              <SvgIcon>
                <FiChevronDown />
              </SvgIcon>
            }
            id="details-accordion"
          >
            <Typography ml={1}>{t.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Count</TableCell>
                    <TableCell>Rarity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {t.types.map((t) => (
                    <TableRow key={t.name}>
                      <TableCell>{t.name}</TableCell>
                      <TableCell>{t.qty}</TableCell>
                      <TableCell>{t.rarity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default TraitAccordions;
