import React, { useState, useContext } from "react";
import { TodoContext } from "../state/todo/todo-context";
import { TodoActions } from "../state/todo/todo.reducer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../todo/todo.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(247, 214, 247);",
    },
    neutral: {
      main: "rgb(31, 31, 84);",
      contrastText: "#fff",
    },
  },
});

export const Todo = () => {
  const [input, setInput] = useState("");
  const { todoState, todoDispatch } = useContext(TodoContext);

  const onInput = (event) => {
    console.log(event.target.value);
    setInput(event.target.value);
  };

  const addTodo = () => {
    todoDispatch({
      type: TodoActions.ADD,
      todo: { title: input, isComplete: false, id: Date.now() },
    });
    setInput("");
  };

  const toggleChecked = (todo) => {
    todoDispatch({
      type: TodoActions.TOGGLE,
      todo,
    });
  };

  const deleteTodo = (id) => {
    todoDispatch({
      type: TodoActions.DELETE,
      payload: id,
    });
  };

  return (
    <TodoContext.Provider
      value={{ todoState, addTodo, deleteTodo, toggleChecked }}
    >
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

        {todoState.todos.map((todo, index) => (
          <div>
            <span key={index}>
              <input
                sx={{
                  "& > :not(style)": { m: 1, width: "2ch" },
                }}
                type="checkbox"
                checked={todo.isComplete}
                onChange={() => toggleChecked(todo)}
              />
              {todo.title}
            

            {todo.text}
            <ThemeProvider theme={theme}>
              <Button color="neutral" onClick={() => deleteTodo(todo.id)}>
                Delete
              </Button>
            </ThemeProvider>
            </span>
          </div>
        ))}
      </div>
    </TodoContext.Provider>
  );
};
