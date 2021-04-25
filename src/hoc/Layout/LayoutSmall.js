import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Navbar from "../../components/Navbar";

const useStyles = makeStyles(() => ({
  root: {
    margin: "72px",
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  const authReducer = useSelector((state) => state.auth);

  return (
    <>
      <Navbar isAuth={!!authReducer.token} />
      <main className={classes.root}>
        <Container maxWidth="sm">{props.children}</Container>
      </main>
    </>
  );
};

export default Layout;
