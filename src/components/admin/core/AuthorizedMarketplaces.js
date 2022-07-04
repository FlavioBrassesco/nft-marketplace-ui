import { useEffect, useState, useContext } from "react";

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

import { useSalesService } from "services/hooks/useSalesService";

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

export default function AuthorizedMarketplaces() {
  const { marketplaces } = useSalesService();

  const addModal = useSwitchState();
  const editModal = useSwitchState();
  const [addField, setAddField] = useState(null);
  const [editField, setEditField] = useState(null);

  const tablePagination = usePagedTable();

  useEffect(() => {
    tablePagination.setData(marketplaces);
  }, [marketplaces, tablePagination]);

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
    const marketplace = marketplaces.filter((c) => c.id === id)[0];
    setEditField({ ...marketplace });
    editModal.setActive();
  };

  const handleRemove = async (e) => {
    // dispatch(remove(editField.id));
    editModal.setInactive();
  };

  const handleUpdate = async (e) => {
    const key = editField.key;
    const address = editField.address;
    const id = editField.id;
    // dispatch(update({ id, key, address }));
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
          Authorized marketplaces
        </Typography>
        <IconButton onClick={addModal.setActive}>
          <FiPlus />
        </IconButton>

        <Modal
          open={Boolean(addModal.switchState)}
          onClose={addModal.setInactive}
          aria-labelledby={`addmp-modal-title`}
          aria-describedby={`addmp-modal-description`}
        >
          <Stack component={Paper} spacing={1} sx={modalStyle}>
            <Typography variant="h6" component="p" id={`addmp-modal-title`}>
              Add Authorized Marketplace
            </Typography>
            <Typography variant="body2">
              Name is just for internal reference.
            </Typography>
            <Stack spacing={1} id={`addmp-modal-description`}>
              <TextField
                label="Name"
                id={`addmp-name-option`}
                defaultValue={addField?.name}
                onChange={handleAddChange("name")}
              />
              <TextField
                label="Address"
                id={`addmp-address-option`}
                defaultValue={addField?.address}
                onChange={handleAddChange("address")}
              />
              <SaveButton variant="contained" child="Add" iconButton={false} />
            </Stack>
          </Stack>
        </Modal>
      </Stack>
      <Modal
        open={Boolean(editModal.switchState)}
        onClose={editModal.setInactive}
        aria-labelledby={`mp-modal-edit-title`}
        aria-describedby={`mp-modal-edit-description`}
      >
        <Stack component={Paper} sx={modalStyle} spacing={1}>
          <Typography variant="h6" component="p" id={`mp-modal-edit-title`}>
            Edit Marketplace: &ldquo;{editField?.name}&rdquo;
          </Typography>
          <Stack spacing={1} id={`mp-modal-edit-description`}>
            <TextField
              label="Name"
              defaultValue={editField?.name}
              id={`mp-name-edit-option`}
              onChange={handleEditChange("name")}
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
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tablePagination.rows().map((h) => (
              <TableRow key={h}>
                <TableCell>
                  <Typography>{h.slice(0, 8)}...</Typography>
                </TableCell>

                <TableCell>
                  <Typography color="text.secondary">{h}</Typography>
                </TableCell>

                <TableCell>
                  <IconButton onClick={handleEditModal(h)}>
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
    </Stack>
  );
}
