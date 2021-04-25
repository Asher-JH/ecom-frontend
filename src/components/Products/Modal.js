import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddProductForm from "./AddProduct/index";
import FileInput from "./AddProduct/FileInput";

const Modal = ({ open, handleClose }) => {
  const [showNext, setShowNext] = useState(false);

  const toggleNext = () => {
    setShowNext(!showNext);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Add new product</DialogTitle>
        <DialogContent>
          {!showNext ? <AddProductForm toggleNext={toggleNext} /> : <FileInput toggleNext={toggleNext} name="files" />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
