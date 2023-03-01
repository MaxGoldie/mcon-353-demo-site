import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../todo/todo.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    neutral: {
      main: "rgb(31, 31, 84);",
      contrastText: "#fff",
    },
  },
});

export const Todo = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Walk dog",
      isComplete: true,
    },
    {
      id: 2,
      text: "Clean bedroom",
      isComplete: false,
    },
  ]);

  const onInput = (event) => {
    console.log(event.target.value);
    setInput(event.target.value);
  };

  const addTodo = () => {
    setTodos([...todos, { id: Date.now(), text: input, isComplete: false }]);
    setInput("");
  };

  const toggleChecked = (todo) => {
    const newTodos = [...todos];
    const updatedTodo = newTodos.find((x) => x.text === todo.text);
    updatedTodo.isComplete = !todo.isComplete;
    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div class="page">
      <h1 class="header">ToDo</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          onInput={onInput}
          value={input}
          id="standard-basic"
          label="Enter Task"
          variant="standard"
        />
      </Box>
      <ThemeProvider theme={theme}>
        <Box textAlign={"center"}>
          <Button onClick={addTodo} color="neutral" variant="outlined">
            Add Task
          </Button>
        </Box>
      </ThemeProvider>

      {todos.map((todo, index) => (
        <div key={todo.id}>
          <span key={index}>
            <TextField
              sx={{
                "& > :not(style)": { m: 1, width: "2ch" },
              }}
              type="checkbox"
              checked={todo.isComplete}
              onChange={() => toggleChecked(todo)}
            />
            {todo.title}
          </span>

          {todo.text}
          <ThemeProvider theme={theme}>
            <Button color="neutral" onClick={() => deleteTodo(todo.id)}>
              Delete
            </Button>
          </ThemeProvider>
        </div>
      ))}
    </div>
  );
};
