import React, { useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../store/actions/items';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import categories from "../../vars/categories";

const useStyles = makeStyles(() => ({
  root: {
    '&	.MuiFormControlLabel-label': {
      fontSize: 14
    }
  }
}));

export default function RadioButtonsGroup() {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const itemReducer = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setValue(event.target.value);
  
    let filtered = itemReducer.items.filter((entry) =>
    Object.values(entry).some(
      (val) => typeof val === "string" && val.includes(event.target.value)
    )
  );
  dispatch(actions.setFiltered(filtered));
  };

  return (
    <FormControl component="fieldset">
      <Typography variant="h6">Brands</Typography>
      <RadioGroup
        aria-label="category"
        name="category"
        value={value}
        onChange={handleChange}
      >
        {categories.map(({ value, label }) => (
          <FormControlLabel className={classes.root} style={{fontSize: '8px'}} key={value} value={value} control={<Radio size="small" color="primary" />} label={label} size="small" />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
