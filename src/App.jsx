import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList/TodoList";
import AddTodoForm from "./components/AddTodoForm/AddTodoForm";
import style from "./styles/App.module.css";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isAscending, setIsAscending] = useState(true);

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

      // Store todos from fetched data
      const todos = data.records.map((record) => ({
        title: record.fields.title,
        createdTime: record.createdTime, // Include createdTime
        id: record.id,
      }));
      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Sort todoList when the order is toggled
  const toggleSortOrder = () => {
    setIsAscending((isAscending) => !isAscending);
    setTodoList((todoList) =>
      [...todoList].sort((objectA, objectB) => {
        const timeA = new Date(objectA.createdTime).getTime();
        const timeB = new Date(objectB.createdTime).getTime();
        return isAscending ? timeB - timeA : timeA - timeB; // Switch between Ascending/Descending
      })
    );
  };

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
        createdTime: data.createdTime, // Include createdTime
        id: data.id,
      };

      // Automatically sort the list after adding a new todo
      setTodoList((todoList) => {
        const updatedList = [...todoList, addedTodo].sort(
          (objectA, objectB) => {
            const timeA = new Date(objectA.createdTime).getTime();
            const timeB = new Date(objectB.createdTime).getTime();
            return isAscending ? timeA - timeB : timeB - timeA;
          }
        );
        return updatedList;
      });
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

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLoading ? (
              <p>Loading...</p>
            ) : (
              <div className={style.container}>
                <h1>Todo List</h1>
                {message && <p>{message}</p>}
                <button onClick={toggleSortOrder}>
                  Sort: {isAscending ? "Ascending" : "Descending"}
                </button>
                <hr />
                <AddTodoForm onAddTodo={addTodo} />
                <br />
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
              </div>
            )
          }
        />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
