import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import LayoutLarge from "../../hoc/Layout/LayoutLarge";
import Categories from "./Categories";
import { Typography } from "@material-ui/core";
import SearchInput from "./SearchInput";
import Item from "../Item";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  itemsContainer: {},
}));

export default function CenteredGrid() {
  const [loading, setLoading] = useState(true);
  const itemReducer = useSelector((state) => state.items);
  const { filteredItems } = itemReducer;
  const classes = useStyles();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [loading]);

  return (
    <LayoutLarge>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              {filteredItems.length} results
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <SearchInput />
          </Grid>
          <Grid item xs={3}>
            <Categories clearValue />
          </Grid>
          <Grid
            item
            xs={9}
            className={classes.itemsContainer}
            style={{ height: "700px", maxHeight: "700px", marginTop: "20px", overflowY: "scroll" }}
          >
            <Grid container spacing={0}>
              {!loading ? (
                filteredItems.map((item) => {
                  return (
                    <Grid key={item._id} item xs={6} md={4}>
                      <Item {...item} />
                    </Grid>
                  );
                })
              ) : (
                <>
                  <Grid item xs={6} md={4}>
                    <Skeleton animation="pulse" variant="rect" width={300} height={400} />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Skeleton animation="pulse" variant="rect" width={300} height={400} />
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Skeleton animation="pulse" variant="rect" width={300} height={400} />
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </LayoutLarge>
  );
}
