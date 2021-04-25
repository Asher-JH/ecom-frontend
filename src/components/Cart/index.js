import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/cart";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CartItem from "./CartItem";
import CheckoutModal from "../Checkout/index";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 450,
  },
  root: {
    width: "100%",
    padding: "20px 20px",
  },
  textBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const Cart = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const cartReducer = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const toggleDrawer = () => {
    dispatch(actions.toggleCart());
  };

  const handleCheckout = () => {
    setOpen(true);
    dispatch(actions.toggleCart());
  }

  const handleClose = () => {
    setOpen(false);
  }

  const list = () => (
    <div className={classes.list} role="presentation">
      <List>
        {!!cartReducer.length ? (
          cartReducer.cart.map((item) => <CartItem {...item} />)
        ) : (
          <Typography variant="overline">Cart is empty</Typography>
        )}
      </List>
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          disabled={!!cartReducer.length ? false : true}
          startIcon={<ShoppingCartIcon />}
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <Drawer anchor="left" open={cartReducer.open} onClose={toggleDrawer}>
        <div className={classes.root}>
          <Typography gutterBottom variant="h3">
            Cart
          </Typography>
          <Divider />
          <div className={classes.textBox}>
            <Typography
              variant="overline"
              style={{ fontWeight: "bold", fontSize: "16px" }}
            >
              {cartReducer.length} items
            </Typography>
            <Typography
              variant="overline"
              style={{ fontWeight: "bold", fontSize: "16px" }}
            >
              Total: ${cartReducer.totalPrice}
            </Typography>
          </div>
          {list()}
        </div>
      </Drawer>
      <CheckoutModal open={open} handleClose={handleClose} totalPrice={cartReducer.totalPrice} />
    </div>
  );
};

export default Cart;
