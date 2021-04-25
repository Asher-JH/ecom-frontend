import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import EditModal from "./EditModal";

const DeleteProductButton = ({ item }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <IconButton onClick={handleOpen} aria-label="delete">
        <EditIcon color="secondary" />
      </IconButton>
      <EditModal open={open} handleClose={handleClose} item={item} />
    </div>
  );
};

export default DeleteProductButton;
