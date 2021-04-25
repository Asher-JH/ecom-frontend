import axios from "../../axios-products";
import * as actionTypes from "./actionTypes";

export const fetchStart = () => {
  return {
    type: actionTypes.FETCH_START,
  };
};

export const fetchSuccess = (items) => {
  return {
    type: actionTypes.FETCH_SUCCESS,
    items: items,
    filteredItems: items,
  };
};

export const setFiltered = (items) => {
  return {
    type: actionTypes.SET_FILTERED,
    filteredItems: items,
  };
};

export const fetchFail = (error) => {
  return {
    type: actionTypes.FETCH_FAIL,
    error: error,
  };
};

export const fetchItems = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    axios
      .get("/")
      .then((response) => {
        dispatch(fetchSuccess(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchFail(error.response.data.message));
      });
  };
};

export const addProduct = (payload) => {
  console.log(localStorage.getItem("token"));
  let token = localStorage.getItem('token')
  let config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    }
  };
  
  return (dispatch) => {
    axios
      .post("/", payload, config)
      .then((response) => {
        console.log(response.data.msg);
        dispatch(fetchItems());
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchFail(error));
      });
  };
};

export const editProduct = (itemId, payload) => {
  console.log(localStorage.getItem("token"));
  let token = localStorage.getItem('token')
  let config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    }
  };
  
  return (dispatch) => {
    axios
      .put(`/${itemId}`, payload, config)
      .then((response) => {
        console.log(response.data.msg);
        dispatch(fetchItems());
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchFail(error));
      });
  };
};

export const deleteProduct = (productId) => {
  let token = localStorage.getItem('token')
  let config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    }
  };
  return (dispatch) => {
    axios
      .delete(`/${productId}`, config)
      .then((response) => {
        console.log(response.data.msg);
        dispatch(fetchItems());
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchFail(error));
      });
  };
};
