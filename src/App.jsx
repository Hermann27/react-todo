import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TodoContainer from "./components/TodoContainer/TodoContainer";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<TodoContainer />} />
          <Route
            path="/todoList-activities"
            element={<TodoContainer showAllActivities={true} />}
          />
        </Routes>
        <nav>
          <Link to="/">Home | </Link>
          <Link to="/todoList-activities">All Activities</Link>
        </nav>
      </div>
    </BrowserRouter>
  );
}

export default App;
