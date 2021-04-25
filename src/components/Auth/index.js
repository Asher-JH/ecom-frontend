import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import * as actions from "../../store/actions/auth";
import { Paper, makeStyles, Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import LayoutSmall from '../../hoc/Layout/LayoutSmall';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-auth';
import Form from "./Form";

const useStyles = makeStyles(() => ({
  authContainer: {
    width: "100%",
    height: "500px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '60px'
  }
}));

const Auth = () => {
  const authReducer = useSelector(state => state.auth);
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const history = useHistory();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const payload = {
      ...data,
      isSignup,
    };
    console.log(payload);
    dispatch(actions.auth(payload));
  };

  useEffect(() => {
    if(authReducer.token) {
      history.push('/')
    }
  }, [authReducer.token, history]);

  return (
    <LayoutSmall>
      <Paper elevation={3} className={classes.authContainer}>
        <Form
          onSubmit={onSubmit}
          setIsSignup={setIsSignup}
          isSignup={isSignup}
        />
      </Paper>
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<ArrowBackIcon />}
          onClick={() => history.push('/')}
        >
          Back to Home
        </Button>
      </div>
    </LayoutSmall>
  );
};

export default withErrorHandler(Auth, axios);
