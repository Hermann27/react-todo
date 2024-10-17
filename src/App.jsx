import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoContainer from "./components/TodoContainer/TodoContainer";
import NavBar from "./components/Navbars/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<TodoContainer />} />
          <Route
            path="/todoList-activities"
            element={<TodoContainer showAllActivities={true} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
