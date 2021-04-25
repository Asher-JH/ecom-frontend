import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloudUpload from "@material-ui/icons/CloudUpload";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";
import Dropzone from "react-dropzone";
import { useData } from "./DataContext";
import { useForm } from "react-hook-form";
import Form from "./Form";
import * as actions from "../../../store/actions/items";
import PrimaryButton from "./PrimaryButton";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#eee",
    textAlign: "center",
    cursor: "pointer",
    color: "#333",
    padding: "10px",
    marginTop: "20px",
  },
  icon: {
    marginTop: "16px",
    color: "#888",
    fontSize: "42px",
  },
});

const FileInput = ({ toggleNext, name }) => {
  const [showButton, setShowButton] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { data, setValues } = useData();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      files: data.files,
    },
  });

  const sendData = () => {
    const entries = Object.entries(data).filter(
      (entry) => entry[0] !== "files"
    );

    const formData = new FormData();
    if (data.files) {
      data.files.forEach((file) => {
        formData.append("files", file, file.name);
      });
    }

    entries.forEach((entry) => {
      formData.append(entry[0], entry[1]);
    });

    console.log("this one", data);
    dispatch(actions.addProduct(formData));
    setValues({
      name: "",
      description: "",
      price: 0,
      category: "all",
      files: []
    });
    toggleNext();
    history.push("/");
  };

  const onSubmit = async (data) => {
    setValues(data);
    setShowButton(!showButton);
    console.log(data);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name={name}
          defaultValue={[]}
          render={({ field: { onChange, onBlur, value, name } }) => (
            <>
              <Dropzone onDrop={onChange}>
                {({ getRootProps, getInputProps }) => (
                  <Paper
                    className={classes.root}
                    variant="outlined"
                    {...getRootProps()}
                  >
                    <CloudUpload className={classes.icon} />
                    <input {...getInputProps()} name={name} onBlur={onBlur} />
                    <p>Drag 'n' drop files here, or click to select files</p>
                  </Paper>
                )}
              </Dropzone>
              <List>
                {value.map((f, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <InsertDriveFile />
                    </ListItemIcon>
                    <ListItemText primary={f.name} secondary={f.size} />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        />
        {!showButton && <PrimaryButton>Upload Image</PrimaryButton>}
      </Form>
      {showButton && (
        <PrimaryButton color="secondary"  onClick={sendData}>Add product</PrimaryButton>
      )}
    </>
  );
};

export default FileInput;
