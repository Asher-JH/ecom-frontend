import React from "react";
import { Controller } from "react-hook-form";
import { TextField, Typography } from "@material-ui/core";

const Input = ({ control, register, errors, type, name }) => {
  let validations = {
    required: true,
  };
  let error;
  let placeholder = "";
  let errorMessage = "";
  if (type === "email") {
    validations = {
      ...validations,
      pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    };
    error = errors.email;
    errorMessage = "Please input a valid email.";
    placeholder = "johndoe@gmail.com";
  }
  if (type === "password") {
    validations = {
      ...validations,
      minLength: 6,
    };
    error = errors.password;
    errorMessage = "Password must be at least 6 characters.";
    placeholder = "legitpassword";
  }
  if (type === "name") {
    validations = {
      ...validations,
      minLength: 1,
    };
    error = errors.name;
    errorMessage = "Please input a valid name";
    placeholder = "John Doe"
  }

  return (
    <Controller
      name={type}
      control={control}
      defaultValue=""
      {...register(type, {
        ...validations,
      })}
      render={({ field }) => (
        <>
          <TextField
            id="outlined-multiline-flexible"
            label={name}
            rowsMax={2}
            fullWidth
            type={type}
            variant="outlined"
            placeholder={placeholder}
            {...field}
          />
          <Typography color="error" variant="overline">
            {error && errorMessage}
          </Typography>
        </>
      )}
    />
  );
};

export default Input;
