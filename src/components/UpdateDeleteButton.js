import { Stack } from "@mui/material";
import { useState } from "react";
import SaveButton from "./SaveButton";

const UpdateDeleteButton = ({
  deleteChild = "Delete",
  deleteClick = async (f) => f,
  updateChild = "Update",
  updateClick = async (f) => f,
}) => {
  const [update, setUpdate] = useState(false);
  const [del, setDel] = useState(false);

  const handleDeleteClick = () => {
    return new Promise((resolve, reject) => {
      setDel(true);
      deleteClick()
        .then((d) => {
          setDel(false);
          resolve(d);
        })
        .catch((e) => {
          setDel(false);
          reject(e);
        });
    });
  };

  const handleUpdateClick = () => {
    return new Promise((resolve, reject) => {
      setUpdate(true);
      updateClick()
        .then((d) => {
          setUpdate(false);
          resolve(d);
        })
        .catch((e) => {
          setUpdate(false);
          reject(e);
        });
    });
  };

  return (
    <Stack direction="row" spacing={1} justifyContent="space-between">
      <SaveButton
        variant="outlined"
        color="error"
        child={deleteChild}
        iconButton={false}
        click={handleDeleteClick}
        disabled={update || del}
      />
      <SaveButton
        variant="contained"
        child={updateChild}
        iconButton={false}
        click={handleUpdateClick}
        disabled={del || update}
      />
    </Stack>
  );
};

export default UpdateDeleteButton;
