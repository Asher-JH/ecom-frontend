import React, { forwardRef } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

const PriceInput = forwardRef((props, ref) => {
  return (
      <TextField
        variant="outlined"
        margin="normal"
        InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}
        inputRef={ref}
        fullWidth
        {...props}
      />
  );
});

export default PriceInput;
