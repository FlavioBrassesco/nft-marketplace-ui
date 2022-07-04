import { useState, useContext, useEffect, useRef } from "react";
import {
  Paper,
  Grid,
  Stack,
  Typography,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  Modal,
  TextField,
  Avatar,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { FiPlus, FiPercent, FiCheck, FiX, FiEdit } from "react-icons/fi";
import { FaEthereum } from "react-icons/fa";
import SaveButton from "../SaveButton";
import UpdateDeleteButton from "../UpdateDeleteButton";
import { Collections as CollectionsCtx } from "contexts/Collections";
import Web3Context from "contexts/Web3Provider";
import usePagedTable from "helpers/usePagedTable";

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

const ActiveCollections = () => {
  const [openCol, setOpenCol] = useState([]);
  const { web3Provider } = useContext(Web3Context);
  const { rows, fillRows, pagination, setData } = usePagedTable();
  const addField = useRef();

  const {
    loading,
    error,
    data,
    getCollections,
    setFee,
    setFloorPrice,
    addWhitelistedCollection,
  } = useContext(CollectionsCtx);

  useEffect(() => {
    if (!data && web3Provider) {
      getCollections(web3Provider);
    }
  }, [data, getCollections, web3Provider]);

  useEffect(() => {
    data && setData(data);
  }, [data, setData]);

  useEffect(() => {
    if (data) {
      setOpenCol([...Array(data.length).fill(false)]);
    }
  }, [data]);

  const handleOpenCol = (i) => () => {
    const newOpenCol = [...openCol];
    newOpenCol[i] = true;
    setOpenCol(newOpenCol);
  };
  const handleCloseCol = (i) => () => {
    const newOpenCol = [...openCol];
    newOpenCol[i] = false;
    setOpenCol(newOpenCol);
  };

  const [openAddCol, setOpenAddCol] = useState(false);

  const handleOpenAddCol = () => {
    setOpenAddCol(true);
  };
  const handleCloseAddCol = () => {
    setOpenAddCol(false);
  };

  const handleClick = async () => {
    return (
      web3Provider &&
      (await addWhitelistedCollection(
        web3Provider.getSigner(),
        addField.current.value
      ))
    );
  };

  return (
    <Grid container spacing={2} sx={{ py: 2 }}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 1 }}
          >
            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
              Active Collections
            </Typography>
            <span>{error.message}</span>
            <IconButton onClick={handleOpenAddCol}>
              <FiPlus />
            </IconButton>

            <Modal
              open={Boolean(openAddCol)}
              onClose={handleCloseAddCol}
              aria-labelledby={`addcol-modal-title`}
              aria-describedby={`addcol-modal-description`}
            >
              <Stack component={Paper} spacing={1} sx={modalStyle}>
                <Typography
                  variant="h6"
                  component="p"
                  id={`addcol-modal-title`}
                >
                  Add Collection
                </Typography>
                <Stack spacing={1} id={`addcol-modal-description`}>
                  <TextField
                    label="Address"
                    id={`addcol-address-option`}
                    fullWidth
                    inputRef={addField}
                  />
                  <SaveButton
                    variant="contained"
                    child="Add"
                    iconButton={false}
                    click={handleClick}
                  />
                </Stack>
              </Stack>
            </Modal>
          </Stack>

          {loading ? (
            <span>Loading...</span>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Collection</TableCell>
                    <TableCell>Fee</TableCell>
                    <TableCell>Floor Price</TableCell>
                    <TableCell>Whitelist</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows().map((collection, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Stack direction="row" alignItems="center">
                          <Avatar
                            src={collection.avatar}
                            alt={collection.name}
                            sx={{ width: 60, height: 60 }}
                          />
                          <Stack sx={{ ml: 1 }}>
                            <Typography variant="h6" lineHeight={1.1}>
                              {collection.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              lineHeight={1.1}
                            >
                              {collection.address}
                            </Typography>
                          </Stack>
                        </Stack>
                      </TableCell>

                      <TableCell>
                        {collection.fee !== "" ? (
                          <Stack direction="row" alignItems="center">
                            <Typography color="text.secondary" lineHeight={0}>
                              <FiPercent />
                            </Typography>

                            <Typography lineHeight={0}>
                              {collection.fee}
                            </Typography>
                          </Stack>
                        ) : (
                          <>&mdash;</>
                        )}
                      </TableCell>

                      <TableCell>
                        {collection.price !== "" ? (
                          <Stack direction="row" alignItems="center">
                            <Typography color="primary.main" lineHeight={0}>
                              <FaEthereum />
                            </Typography>

                            <Typography>{collection.price}</Typography>
                          </Stack>
                        ) : (
                          <>&mdash;</>
                        )}
                      </TableCell>

                      <TableCell>
                        <Typography color="text.secondary" lineHeight={0}>
                          {collection.whitelisted ? <FiCheck /> : <FiX />}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <IconButton onClick={handleOpenCol(i)}>
                          <FiEdit />
                        </IconButton>

                        <Modal
                          open={Boolean(openCol[i])}
                          onClose={handleCloseCol(i)}
                          aria-labelledby={`col-modal-title-${i}`}
                          aria-describedby={`col-modal-description-${i}`}
                        >
                          <Stack component={Paper} sx={modalStyle} spacing={1}>
                            <Typography
                              variant="h6"
                              component="p"
                              id={`col-modal-title-${i}`}
                            >
                              Edit Collection: &ldquo;{collection.name}&rdquo;
                            </Typography>
                            <Stack
                              spacing={1}
                              id={`col-modal-description-${i}`}
                            >
                              <TextField
                                label="Fee"
                                value={collection.fee}
                                id={`col-fee-option-${i}`}
                                fullWidth
                              />
                              <TextField
                                label="Floor Price"
                                value={collection.price}
                                id={`col-price-option-${i}`}
                                fullWidth
                              />
                              <FormGroup>
                                <FormControlLabel
                                  control={<Switch />}
                                  label="Whitelisted"
                                />
                              </FormGroup>
                              <UpdateDeleteButton
                                deleteClick={handleClick}
                                updateClick={handleClick}
                              />
                            </Stack>
                          </Stack>
                        </Modal>
                      </TableCell>
                    </TableRow>
                  ))}
                  {fillRows()}
                </TableBody>
                <TableFooter>
                  <TableRow>{pagination()}</TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ActiveCollections;
