import React from "react";
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/items';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const DeleteProductButton = ({productId}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(actions.deleteProduct(productId));
  };
  
  return (
    <IconButton onClick={handleDelete} aria-label="delete">
      <DeleteIcon color="error" />
    </IconButton>
  );
};

export default DeleteProductButton;
