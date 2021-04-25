import axios from "axios";

const instance = axios.create({
  baseURL: "https://ecom-backend-1.herokuapp.com/carts",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
