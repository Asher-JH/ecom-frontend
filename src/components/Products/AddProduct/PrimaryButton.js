import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((themes) => ({
  root: {
    margin: themes.spacing(3, 0, 2),
  },
}));

const PrimaryButton = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.root}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
