import axios from "../../axios-auth";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId, isAdmin) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
    isAdmin: isAdmin === 'false' ? false : true
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  localStorage.removeItem("isAdmin");

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = ({name, email, password, isSignup}) => {
  return (dispatch) => {
    dispatch(authStart());
    let authData = {
      email,
      password,
    };
    let url = `/login`;
    if (isSignup) {
      url = `/register`;
      authData = {
        ...authData,
        name
      }
    }
    axios
      .post(url, authData)
      .then((response) => {
        const expirationDate = new Date(new Date().getTime() + 3000 * 1000);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user);
        localStorage.setItem("isAdmin", response.data.isAdmin);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(response.data.token, response.data.user, response.data.isAdmin));
        console.log(response.data.isAdmin);
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.message));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const isAdmin = localStorage.getItem('isAdmin');
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId, isAdmin));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
};