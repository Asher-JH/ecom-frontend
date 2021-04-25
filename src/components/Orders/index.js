import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import LayoutLarge from "../../hoc/Layout/LayoutLarge";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import OrderItem from "./Accordion";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.primary.main,
    marginBottom: "20px",
  },
}));

const Orders = () => {
  const classes = useStyles();
  const orderReducer = useSelector((state) => state.cart);

  return (
    <LayoutLarge>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">Orders</Typography>
          </Grid>
          {!!orderReducer.orders.length
            ? orderReducer.orders.map((order, index) => {
                let date = new Date(order.purchased_date);
                return (
                  <Grid item xs={12}>
                    <Typography variant="overline">
                      Order #{index + 1}
                    </Typography>
                    <Paper className={classes.paper}>
                      <Typography
                        variant="overline"
                        style={{
                          fontSize: "16px",
                          marginRight: "40px",
                          fontWeight: "bolder",
                        }}
                      >
                        Date:{" "}
                        {date.getDate() +
                          "-" +
                          (date.getMonth() + 1) +
                          "-" +
                          date.getFullYear()}
                      </Typography>
                      <Typography
                        variant="overline"
                        style={{ fontSize: "16px", fontWeight: "bolder" }}
                      >
                        Total: ${order.total}
                      </Typography>
                    </Paper>
                    <Grid container xs={12}>
                      {order.items.map((item) => {
                        return (
                          <Grid key={item._id} item xs={4}>
                            <OrderItem {...item} />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                );
              })
            : "No Orders"}
        </Grid>
      </div>
    </LayoutLarge>
  );
};

export default Orders;
