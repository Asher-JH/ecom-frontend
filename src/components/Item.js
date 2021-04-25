import React from "react";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions/cart";
import { Button } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const Item = ({ _id, image, name, description, price, category }) => {
  const dispatch = useDispatch();
  let img = `https://ecom-backend-1.herokuapp.com/uploads/${image}`;

  const handleAddToCart = () => {
    dispatch(
      actions.addToCart({
        itemId: _id,
        quantity: 1,
      })
    );
    dispatch(actions.openCart());
  };

  return (
    <div
      style={{
        padding: "10px",
        marginBottom: "10px",
        position: "relative",
        overflowY: "visible",
      }}
    >
      <div className="card">
        <img src={img} alt="" className="card__img" />
        <div className="card__data">
          <h1 className="card__title">{name}</h1>
          <span className="card__price">${price}</span>
          <p className="card__description">{description}</p>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            startIcon={<ShoppingCartIcon />}
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Item;
