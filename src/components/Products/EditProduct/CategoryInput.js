import React, { forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Categories from "../../../vars/categories";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginTop: "16px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CategoryInput = forwardRef((props, ref) => {
  const classes = useStyles();
  let brands = [...Categories];
  brands.shift(); 
  
  return (
    <FormControl fullWidth variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        defaultValue="nike"
        label="Category"
        inputRef={ref}
        {...props}
      >
        {brands.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  );
});

export default CategoryInput;
