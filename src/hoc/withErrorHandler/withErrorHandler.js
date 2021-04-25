import React from "react";
import useHttpErrorHandler from "../../hooks/http-error-handler";
import { Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const withErrorHandler = (WrappedComponent, axios) => {
  const WithErrorHandler = (props) => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={error !== null}
          onClose={clearError}
          key={"topCenter"}
        >
          <Alert onClose={clearError} severity="error">
          {error !== null ? error.response.data.message : null}
          </Alert>
        </Snackbar>
        <WrappedComponent {...props} />
      </>
    );
  };
  return WithErrorHandler;
};

export default withErrorHandler;
