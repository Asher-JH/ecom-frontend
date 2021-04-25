import axios from "../../axios-cart";
import axiosOrder from "../../axios-order";
import * as actionTypes from "./actionTypes";

export const fetchSuccess = (cart) => {
  return {
    type: actionTypes.FETCH_CART_SUCCESS,
    cart: cart,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const openCart = () => {
  return {
    type: actionTypes.OPEN_CART,
    open: true,
  };
};

export const closeCart = () => {
  return {
    type: actionTypes.CLOSE_CART,
    open: false,
  };
};

export const toggleCart = () => {
  return {
    type: actionTypes.TOGGLE_CART,
  };
};

export const fetchCart = () => {
  let token = localStorage.getItem("token");
  let config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  return (dispatch) => {
    axios
      .get("/", config)
      .then((response) => {
        dispatch(fetchSuccess(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addToCart = (payload) => {
  console.log(localStorage.getItem("token"));
  let token = localStorage.getItem("token");
  let config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };

  return (dispatch) => {
    axios
      .post("/", payload, config)
      .then((response) => {
        console.log(response.data.msg);
        dispatch(fetchCart());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteFromCart = (itemId) => {
  let token = localStorage.getItem("token");
  let config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  return (dispatch) => {
    axios
      .delete(`/${itemId}`, config)
      .then((response) => {
        console.log(response.data.msg);
        dispatch(fetchCart());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const checkout = () => {
  let token = localStorage.getItem("token");
  let config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  return (dispatch) => {
    axiosOrder
      .post(`/`, {}, config)
      .then((response) => {
        console.log(response.data.msg);
        dispatch(fetchCart());
        dispatch(fetchOrders());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const fetchOrders = () => {
  let token = localStorage.getItem("token");
  let config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  return (dispatch) => {
    axiosOrder
      .get(`/`, config)
      .then((response) => {
        console.log(response.data.msg);
        dispatch(fetchOrdersSuccess(response.data))
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
