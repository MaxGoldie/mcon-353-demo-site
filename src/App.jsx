import "./App.css";
import { useReducer } from "react";
import { Home } from "./Components/home/home";
import { Todo } from "./Components/todo/todo";
import { Chat } from "./Components/chat/chat";
import { Header } from "./Components/header/header";
import { HashRouter, Routes, Route } from "react-router-dom";
import { TodoContext } from "./Components/state/todo/todo-context";
import { todoReducer } from "./Components/state/todo/todo.reducer";

function App() {
  const [todoState, todoDispatch] = useReducer(todoReducer, {
    todos: [
      /*  {
          title: "Buy Milk",
           isComplete: false,
        },
        {
          title: "Walk Dog",
          isComplete: true,
         }, */
    ],
  });

  return (
    <HashRouter>
      <Header />
      <TodoContext.Provider value={{ todoState, todoDispatch }}>
        <Routes>
          {/* http://localhost:3000/#/ */}
          <Route path="/" element={<Home />} />
          {/* http://localhost:3000/#/todo */}
          <Route path="/todo" element={<Todo />} />
           {/* http://localhost:3000/#/chat */}
           <Route path="/chat" element={<Chat />} />
        </Routes>
      </TodoContext.Provider>
    </HashRouter>
  );
}

export default App;
