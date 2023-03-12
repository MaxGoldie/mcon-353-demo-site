import "./App.css";
import { Home } from "./Components/home/home";
import { Todo } from "./Components/todo/todo";
import { Header } from "./Components/header/header";
import { HashRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        {/* http://localhost:3000/#/ */}
        <Route path="/" element={<Home />} />
        {/* http://localhost:3000/#/todo */}
        <Route path="/todo" element={<Todo />} />
      
        
      </Routes>
    </HashRouter>
  );
}

export default App;