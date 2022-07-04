import { useState } from "react";
import {
  Grid,
  Paper,
  Stack,
  Typography,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Modal,
  TextField,
  TableFooter,
  TablePagination,
  InputAdornment,
  SvgIcon,
  Button,
} from "@mui/material";
import TablePaginationActions from "../TablePaginationActions";
import SaveButton from "../SaveButton";
import { FiPlus, FiDollarSign, FiTrash } from "react-icons/fi";

const tokens = [
  {
    name: "DAI",
    symbol: "DAI",
    address: "0x00000as0d0d",
    logo: "https://picsum.photos/seed/dai/200/200",
  },
  {
    name: "Wrapped Ether",
    symbol: "WETH",
    address: "0x00000as0d0d",
    logo: "https://picsum.photos/seed/weth/200/200",
  },
  {
    name: "Wrapped BNB",
    symbol: "WNBN",
    address: "0x00000as0d0d",
    logo: "https://picsum.photos/seed/wbnb/200/200",
  },
];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const SalesOptions = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tokens.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [openTk, setOpenTk] = useState([...Array(tokens.length).fill(false)]);

  const handleOpenTk = (i) => () => {
    const newOpenTk = [...openTk];
    newOpenTk[i] = true;
    setOpenTk(newOpenTk);
  };
  const handleCloseTk = (i) => () => {
    const newOpenTk = [...openTk];
    newOpenTk[i] = false;
    setOpenTk(newOpenTk);
  };

  const [openAddTk, setOpenAddTk] = useState(false);

  const handleOpenAddTk = () => {
    setOpenAddTk(true);
  };
  const handleCloseAddTk = () => {
    setOpenAddTk(false);
  };

  return (
    <Grid container spacing={2} sx={{ py: 2 }}>
      <Grid item md={8}>
        <Paper sx={{ p: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 1 }}
          >
            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
              Available Tokens
            </Typography>
            <IconButton onClick={handleOpenAddTk}>
              <FiPlus />
            </IconButton>

            <Modal
              open={openAddTk}
              onClose={handleCloseAddTk}
              aria-labelledby={`addtk-modal-title`}
              aria-describedby={`addtk-modal-description`}
            >
              <Stack spacing={1} component={Paper} sx={modalStyle}>
                <Typography variant="h6" component="p" id={`addtk-modal-title`}>
                  Add Available Token
                </Typography>
                <Typography variant="body2">
                  This adds a token option for buyers to pay with
                </Typography>
                <Stack spacing={1} id={`addtk-modal-description`}>
                  <TextField label="Address" id={`addtk-address-option`} />
                  <SaveButton variant="contained" child="Add" iconButton={false}/>
                </Stack>
              </Stack>
            </Modal>
          </Stack>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Logo</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Symbol</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? tokens.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : tokens
                ).map((h, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Avatar
                        src={h.logo}
                        alt={h.name}
                        sx={{ width: 30, height: 30 }}
                      />
                    </TableCell>

                    <TableCell>
                      <Typography>{h.name}</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography>{h.symbol}</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography color="text.secondary">
                        {h.address}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <SaveButton child={<SvgIcon><FiTrash /></SvgIcon>} />
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
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={6}
                    count={tokens.length}
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
        </Paper>
      </Grid>
      <Grid item md={4}>
        <Paper sx={{ p: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Typography variant="h6" component="h2">
              Treasury Address
            </Typography>
            <SaveButton />
          </Stack>
          <TextField
            label="Treasury Address"
            id="site-title-option"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon>
                    <FiDollarSign />
                  </SvgIcon>
                </InputAdornment>
              ),
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SalesOptions;
