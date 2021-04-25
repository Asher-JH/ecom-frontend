import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/items';
import { InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    "& > *": {
      width: "100%",
      backgroundColor: "#fff",
    },
  },
}));

const SearchInput = () => {
  const classes = useStyles();
  const itemReducer = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    let filtered = itemReducer.items.filter((entry) =>
      Object.values(entry).some(
        (val) => typeof val === "string" && val.includes(e.target.value)
      )
    );
    dispatch(actions.setFiltered(filtered));
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        onChange={changeHandler}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default SearchInput;
