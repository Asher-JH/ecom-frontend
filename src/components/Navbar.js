import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions/cart";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from '@material-ui/core/Badge';

import Menu from "./Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navbar: {
    backgroundColor: "#272D40",
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

export default function ButtonAppBar({ isAuth }) {
  const authReducer = useSelector((state) => state.auth);
  const cartReducer = useSelector((state) => state.cart);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.navbar}>
          <Typography variant="h6" className={classes.title} onClick={() => history.push('/')}>
            SHOE STORE
          </Typography>
          {isAuth ? (
            <>
              {!authReducer.isAdmin && (
                <IconButton
                  color="inherit"
                  size="medium"
                  onClick={() => dispatch(actions.toggleCart())}
                >
                  <StyledBadge badgeContent={cartReducer.length} color="primary">
                    <ShoppingCartIcon fontSize="large" />
                  </StyledBadge>
                </IconButton>
              )}
              <IconButton color="inherit" onClick={handleClick} size="medium">
                <AccountCircle fontSize="large" />
              </IconButton>
              <Menu handleClose={handleClose} anchorEl={anchorEl} />
            </>
          ) : (
            <Button
              color="inherit"
              component={(props) => <Link to="/auth" {...props} />}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
