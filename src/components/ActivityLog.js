import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  Paper,
  Stack,
  Avatar,
  Typography,
  TablePagination,
  SvgIcon,
} from "@mui/material";
import TablePaginationActions from "./TablePaginationActions";
import { useState } from "react";

import { FaEthereum } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

const ActivityLog = ({ history = [], item = false }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - history.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {item && <TableCell>Item</TableCell>}
            <TableCell>Event</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Date</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? history.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : history
          ).map((h, i) => (
            <TableRow key={i}>
              {item && (
                <TableCell>
                  <Stack direction="row" alignItems="center">
                    <Avatar
                      src="https://picsum.photos/seed/cripto/200/200"
                      alt=""
                      sx={{ width: 60, height: 60 }}
                    />
                    <Stack ml={2}>
                      <Typography variant="subtitle2" lineHeight={1.1}>
                        Collection Name
                      </Typography>
                      <Typography variant="h6" component="h3" lineHeight={1.1}>
                        NFT Name #1092
                      </Typography>
                    </Stack>
                  </Stack>
                </TableCell>
              )}
              <TableCell>
                <Typography variant="subtitle2">{h.event}</Typography>
              </TableCell>
              <TableCell>
                {h.price !== "" ? (
                  <Stack direction="row" alignItems="center">
                    <Typography color="primary.main" lineHeight={0}>
                      <SvgIcon fontSize="small">
                        <FaEthereum />
                      </SvgIcon>
                    </Typography>

                    <Typography>{h.price}</Typography>
                  </Stack>
                ) : (
                  <>&mdash;</>
                )}
              </TableCell>
              <TableCell>
                <Typography
                  href="#"
                  component="a"
                  variant="body2"
                  color="text.secondary"
                  sx={{ textDecoration: "none" }}
                >
                  {h.from}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  href="#"
                  variant="body2"
                  component="a"
                  color="text.secondary"
                  sx={{ textDecoration: "none" }}
                >
                  {h.to || <>&mdash;</>}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {h.date}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  href={h.url}
                  component="a"
                  sx={{ textDecoration: "none" }}
                  color="text.secondary"
                >
                  <SvgIcon>
                    <FiExternalLink />
                  </SvgIcon>
                </Typography>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 64 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={6}
              count={history.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ActivityLog;
