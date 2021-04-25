import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { makeStyles, Typography, Button } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

import Input from "./Input";

const useStyles = makeStyles(() => ({
  formContainer: {
    width: "100%",
    paddingBottom: "40px",
    paddingLeft: "50px",
    paddingRight: "50px",

    "& .MuiTextField-root": {
      marginTop: "20px",
    },

    "& .MuiButton-root": {
      marginTop: "20px",
    },
  },
}));

const Form = ({ onSubmit, isSignup, setIsSignup }) => {
  const classes = useStyles();
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: "",
        email: "",
        password: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <form className={classes.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <Typography
          gutterBottom
          align="center"
          variant="h4"
          style={{ fontWeight: "bold" }}
        >
          {isSignup ? "Register" : "Login"}
        </Typography>
        {isSignup && (
          <Input
            control={control}
            type="name"
            name="Name"
            register={register}
            errors={errors}
          />
        )}
        <Input
          control={control}
          type="email"
          name="Email"
          register={register}
          errors={errors}
        />
        <Input
          control={control}
          type="password"
          name="Password"
          register={register}
          errors={errors}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          endIcon={<PersonIcon />}
        >
          {isSignup ? "Register" : "Login"}
        </Button>
      </form>
      <Button
        color="primary"
        onClick={() => {
          setIsSignup(!isSignup);
          reset({
            name: "",
            email: "",
            password: "",
          });
        }}
      >
        <Typography align="center" variant="caption">
          {isSignup ? "Already have an account?" : "New user?"}
        </Typography>
      </Button>
    </>
  );
};

export default Form;
