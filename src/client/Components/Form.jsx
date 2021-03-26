import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const Form = ({ inputsMap, handleSubmit }) => {
  const classes = useStyles();
  const [inputsState, setInputStates] = useState(inputsMap);
  const inputsArray = Object.entries(inputsState);

  const handleChange = (event) => {
    const value = event.target.value;
    const currentInput = inputsState[[event.target.name]];
    currentInput.value = value;
    setInputStates({
      ...inputsState,
      [event.target.name]: currentInput,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(inputsState);
  };

  return (
    <div className={classes.root}>
      {inputsArray.map((input) => {
        const [key, { value, label }] = input;
        return (
          <TextField
            key={key}
            name={key}
            label={label}
            value={value}
            onChange={handleChange}
          />
        );
      })}
      <Button variant="contained" onClick={onSubmit}>
        Update Post
      </Button>
    </div>
  );
};

export default Form;
