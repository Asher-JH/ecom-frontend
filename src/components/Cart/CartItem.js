import React from "react";
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/cart';
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: "10px 20px",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    marginBottom: "15px"
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  deleteBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const CartItem = ({ itemId, image, price, name, quantity, subtotal }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let img = `http://localhost:4000/uploads/${image}`;

  const handleRemoveCartItem = () => {
    dispatch(actions.deleteFromCart(itemId));
  };

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.cover} image={img} alt="Cart item image" />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            {name} x{quantity}
          </Typography>
          <Typography variant="overline">${price}</Typography>
          <Divider color="secondary" style={{marginBottom: "10px"}} />
          <div className={classes.deleteBox}>
            <Typography variant="subtitle2">Subtotal: ${subtotal}</Typography>
            <Button variant="contained" size="small" color="secondary" onClick={handleRemoveCartItem}>
              Remove
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default CartItem;
