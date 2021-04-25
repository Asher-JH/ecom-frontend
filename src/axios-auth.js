import axios from "axios";

const instance = axios.create({
  baseURL: "https://ecom-backend-1.herokuapp.com/users",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
