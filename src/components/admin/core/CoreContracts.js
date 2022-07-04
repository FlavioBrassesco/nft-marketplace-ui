import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetch,
  add,
  remove,
  update,
  selectAll,
} from "state/coreContractsSlice";

import {
  Stack,
  Typography,
  IconButton,
  TextField,
  Modal,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
  Paper,
} from "@mui/material";
import { FiPlus, FiEdit } from "react-icons/fi";
import SaveButton from "components/SaveButton";
import UpdateDeleteButton from "components/UpdateDeleteButton";

import { useSwitchState } from "helpers/useSwitchState";
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

export default function CoreContracts(props) {
  const dispatch = useDispatch();

  const contracts = useSelector(selectAll);
  const status = useSelector((state) => state.coreContracts.status);
  const addModal = useSwitchState();
  const editModal = useSwitchState();
  const [addField, setAddField] = useState(null);
  const [editField, setEditField] = useState(null);

  const tablePagination = usePagedTable();

  useEffect(() => {
    if (contracts.length === 0) {
      dispatch(fetch());
    }
  }, [contracts, dispatch]);

  useEffect(() => {
    tablePagination.setData(contracts);
  }, [contracts, tablePagination]);

  const handleAddChange = (key) => (e) => {
    setAddField({
      ...addField,
      [key]: e.target.value,
    });
  };

  const handleEditChange = (key) => (e) => {
    setEditField({
      ...editField,
      [key]: e.target.value,
    });
  };

  const handleEditModal = (id) => (e) => {
    const contract = contracts.filter((c) => c.id === id)[0];
    setEditField({ ...contract });
    editModal.setActive();
  };

  const handleAdd = async (e) => {
    const key = addField.key;
    const address = addField.address;
    dispatch(add({ key, address }));
    addModal.setInactive();
  };

  const handleRemove = async (e) => {
    dispatch(remove(editField.id));
    editModal.setInactive();
  };

  const handleUpdate = async (e) => {
    const key = editField.key;
    const address = editField.address;
    const id = editField.id;
    dispatch(update({ id, key, address }));
  };

  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h6" component="h2">
          Core Contracts
        </Typography>
        <IconButton onClick={addModal.setActive}>
          <FiPlus />
        </IconButton>

        <Modal
          open={Boolean(addModal.switchState)}
          onClose={addModal.setInactive}
          aria-labelledby={`addcc-modal-title`}
          aria-describedby={`addcc-modal-description`}
        >
          <Stack component={Paper} spacing={1} sx={modalStyle}>
            <Typography variant="h6" component="p" id={`addcc-modal-title`}>
              Add Core Contract
            </Typography>
            <Stack spacing={1} id={`addcc-modal-description`}>
              <TextField
                label="Key"
                id={`addcc-key-option`}
                defaultValue={addField?.key}
                onChange={handleAddChange("key")}
              />
              <TextField
                label="Address"
                id={`addcc-address-option`}
                defaultValue={addField?.address}
                onChange={handleAddChange("address")}
              />
              <SaveButton
                variant="contained"
                child="Add"
                iconButton={false}
                click={handleAdd}
              />
            </Stack>
          </Stack>
        </Modal>
      </Stack>

      {status === "success" ? (
        <>
          <Modal
            open={Boolean(editModal.switchState)}
            onClose={editModal.setInactive}
            aria-labelledby={`cc-modal-edit-title`}
            aria-describedby={`cc-modal-edit-description`}
          >
            <Stack component={Paper} spacing={1} sx={modalStyle}>
              <Typography variant="h6" component="p" id={`cc-modal-title-edit`}>
                Edit Core Contract: {editField?.key}
              </Typography>
              <Typography variant="body2">
                Key works as internal reference to core functions. Be careful
                when editing this field.
              </Typography>
              <Stack spacing={1} id={`cc-modal-description-edit`}>
                <TextField
                  label="Key"
                  defaultValue={editField?.key}
                  id={`cc-name-option-edit`}
                  onChange={handleEditChange("key")}
                />
                <TextField
                  label="Address"
                  defaultValue={editField?.address}
                  id={`cc-address-option-edit`}
                  onChange={handleEditChange("address")}
                />
                <UpdateDeleteButton
                  deleteClick={handleRemove}
                  updateClick={handleUpdate}
                />
              </Stack>
            </Stack>
          </Modal>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Key</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tablePagination.rows().map((h) => (
                  <TableRow key={h.id}>
                    <TableCell>
                      <Typography>{h.key}</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography color="text.secondary">
                        {h.address}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <IconButton onClick={handleEditModal(h.id)}>
                        <FiEdit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {tablePagination.fillRows()}
              </TableBody>
              <TableFooter>
                <TableRow>{tablePagination.pagination()}</TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </>
      ) : (
        "loading"
      )}
    </Stack>
  );
}
