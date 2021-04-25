import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import LayoutLarge from "../../hoc/Layout/LayoutLarge";
import Modal from "./Modal";
import ProductsTable from "./Table";
import SearchInput from "./SearchInput";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  searchInput: {
    "& > *": {
      width: "100%",
      backgroundColor: "#fff",
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const Products = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <LayoutLarge className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} style={{ marginBottom: "50px" }}>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            Products
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <SearchInput />
        </Grid>
        <Grid item className={classes.buttonContainer} xs={6}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            New Product
          </Button>
        </Grid>
        <Grid item xs={12}>
          <ProductsTable />
        </Grid>
      </Grid>
      <Modal open={open} handleClose={handleClose} />
    </LayoutLarge>
  );
};

export default Products;
