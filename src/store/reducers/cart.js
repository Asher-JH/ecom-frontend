import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils";

const initialState = {
  open: false,
  cart: [],
  length: 0,
  totalPrice: 0,
  orders: [],
};

const fetchSuccess = (state, action) => {
  let items = action.cart.items ? action.cart.items : [];
  return updateObject(state, {
    cart: items,
    length: items.length,
    totalPrice: action.cart.total ? action.cart.total : 0,
  });
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
  });
};

const openCart = (state, action) => {
  return updateObject(state, {
    open: action.open,
  });
};

const closeCart = (state, action) => {
  return updateObject(state, {
    open: action.open,
  });
};

const toggleCart = (state, action) => {
  return updateObject(state, {
    open: !state.open,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CART_SUCCESS:
      return fetchSuccess(state, action);
    case actionTypes.OPEN_CART:
      return openCart(state, action);
    case actionTypes.CLOSE_CART:
      return closeCart(state, action);
    case actionTypes.TOGGLE_CART:
      return toggleCart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
