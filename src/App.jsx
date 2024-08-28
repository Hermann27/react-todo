import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      const todos = data.records.map((record) => ({
        title: record.fields.title,
        id: record.id,
      }));
      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 2000); // Clear message after 3 seconds
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [message]);

  const addTodo = async (newTodo) => {
    const formattedCompletedAt = new Date(newTodo.completedAt)
      .toISOString()
      .split("T")[0];
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          title: newTodo.title,
          completedAt: formattedCompletedAt,
        },
      }),
    };
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      const addedTodo = {
        title: data.fields.title,
        completedAt: data.fields.completedAt,
        id: data.id,
      };
      setTodoList([...todoList, addedTodo]);
      setMessage("Todo added successfully!");
    } catch (error) {
      setMessage(`Error adding todo: ${error.message}`);
    }
  };

  const removeTodo = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${id}`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const newTodoList = todoList.filter((todo) => id !== todo.id);
      setTodoList(newTodoList);
      setMessage("Todo removed successfully!");
    } catch (error) {
      setMessage(`Error removing todo: ${error.message}`);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLoading ? (
              <p>Loading...</p>
            ) : (
              <center>
                <h1>Todo List</h1>
                {message && <p>{message}</p>}
                <AddTodoForm onAddTodo={addTodo} />
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
              </center>
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
