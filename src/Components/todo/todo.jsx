import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

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
    <div>
      <h1>ToDo</h1>
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

      <Stack direction="row" spacing={2}>
        <Button onClick={addTodo} variant="outlined">
          Add Task
        </Button>
      </Stack>

      {todos.map((todo, index) => (
        <div key={todo.id}>
          <span key={index}>
            <input
              type="checkbox"
              checked={todo.isComplete}
              onChange={() => toggleChecked(todo)}
            />
            {todo.title}
          </span>

          <span>{todo.text}</span>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
