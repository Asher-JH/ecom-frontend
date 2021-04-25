import React, { useState } from "react";
import {useDispatch} from 'react-redux';
import * as actions from '../../store/actions/cart'; 
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CheckoutModal = ({ open, handleClose, totalPrice }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleClose();
      dispatch(actions.checkout());
    }, 4000);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-slide-title">Checkout</DialogTitle>
        {loading && (
          <div
            style={{ width: "300px", display: "flex", justifyContent: "center", marginTop: "40px", marginBottom: "40px" }}
          >
            <CircularProgress size={70} />
          </div>
        )}
        {!loading && (
          <DialogContent style={{ width: "500px" }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography gutterBottom variant="h5">
                Total:
              </Typography>
              <Typography gutterBottom variant="h5">
                ${totalPrice}
              </Typography>
            </div>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              size="large"
              onClick={handleCheckout}
              style={{ marginBottom: "30px", marginTop: "50px" }}
              startIcon={<AccountBalanceIcon />}
            >
              Online Banking
            </Button>
            <Button
              variant="contained"
              fullWidth
              color="secondary"
              size="large"
              onClick={handleCheckout}
              startIcon={<CreditCardIcon />}
            >
              Credit Card
            </Button>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CheckoutModal;
