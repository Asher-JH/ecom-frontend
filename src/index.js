import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./store/reducers/index";
import { DataProvider } from "./components/Products/AddProduct/DataContext";
import { EditDataProvider } from "./components/Products/EditProduct/DataContext";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import "./index.css";
import App from "./App";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#272D40",
    },
    secondary: {
      main: "#F2A20C",
    },
    error: {
      main: red[500],
    },
  },
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <EditDataProvider>
        <DataProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </DataProvider>
      </EditDataProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
