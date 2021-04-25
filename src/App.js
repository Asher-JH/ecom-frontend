import React, { useState, useEffect } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import * as actions from "./store/actions/auth";
import * as itemActions from "./store/actions/items";
import * as cartActions from "./store/actions/cart";
import Auth from "./components/Auth/index";
import Home from "./components/Home/index";
import Logout from "./components/Auth/Logout";
import Products from "./components/Products/index";
import Orders from './components/Orders/index';
import SimpleBackdrop from "./components/SimpleBackdrop";
import AddProductForm from "./components/Products/AddProduct/index";
import FileInput from "./components/Products/AddProduct/FileInput";

function App() {
  const authReducer = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(actions.authCheckState());
    if (authReducer.loading) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [dispatch, authReducer.loading]);

  useEffect(() => {
    dispatch(itemActions.fetchItems());
    dispatch(cartActions.fetchCart());
    dispatch(cartActions.fetchOrders());
  }, [dispatch]);

  // If time set up proper routes, protected routes/admin routes

  const defaultRoutes = (
    <Switch>
      <Route path="/auth">
        <Auth />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
      <Redirect to="/auth" />
    </Switch>
  );

  const authRoutes = (
    <Switch>
      <Route path="/logout">
        <Logout />
      </Route>
      <Route path="/orders">
        <Orders />
      </Route>
      <Route path="/">
        <Home />
      </Route>
      <Redirect to="/" />
    </Switch>
  );

  const adminRoutes = (
    <Switch>
      <Route path="/logout">
        <Logout />
      </Route>
      <Route path="/products">
        <Products />
      </Route>
      <Route path="/productDetails">
        <AddProductForm />
      </Route>
      <Route path="/productFile">
        <FileInput />
      </Route>
      <Redirect to="/products" />
    </Switch>
  );

  let routes = defaultRoutes;

  if (authReducer.token) {
    routes = authReducer.isAdmin ? adminRoutes : authRoutes;
  }

  return (
    <div className="App">
      {routes}
      <SimpleBackdrop open={open} />
    </div>
  );
}

export default withRouter(App);
