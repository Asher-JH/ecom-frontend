import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditProductForm from "./EditProduct/index";
import FileInput from "./EditProduct/FileInput";

const EditModal = ({ open, handleClose, item }) => {
  const [showNext, setShowNext] = useState(false);

  const toggleNext = () => {
    setShowNext(!showNext);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Edit product</DialogTitle>
        <DialogContent>
          {!showNext ? <EditProductForm toggleNext={toggleNext} item={item} /> : <FileInput toggleNext={toggleNext} item={item} name="files" />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditModal;
