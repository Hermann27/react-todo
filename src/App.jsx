import TodoList from "./components/TodoList/TodoList";
import AddTodoForm from "./components/AddTodoForm/AddTodoForm";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isAscending, setIsAscending] = useState(true); // New state for sort order

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

      // Sort the data based on the current sort order
      data.records.sort((objectA, objectB) => {
        /*  Sort by title 
        const titleA = objectA.fields.title.toLowerCase();
        const titleB = objectB.fields.title.toLowerCase();

        // Ascending or Descending order based on state
        if (isAscending) {
          if (titleA < titleB) return -1;
          if (titleA > titleB) return 1;
          return 0;
        } else {
          if (titleA < titleB) return 1;
          if (titleA > titleB) return -1;
          return 0;
        }*/
        const timeA = new Date(objectA.createdTime).getTime();
        const timeB = new Date(objectB.createdTime).getTime();

        // Ascending or Descending order based on state
        if (isAscending) {
          return timeA - timeB; // Sort by ascending createdTime
        } else {
          return timeB - timeA; // Sort by descending createdTime
        }
      });

      const todos = data.records.map((record) => ({
        title: record.fields.title,
        id: record.id,
      }));
      setTodoList(todos); // I am updating my todo list state with sorted todos
      setIsLoading(false); //I am stopping the loading with false value
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
        createdTime: data.createdTime, // Airtable returns the createdTime of the record
        id: data.id,
      };
      const updatedList = [...todoList, addedTodo].sort((objectA, objectB) => {
        const timeA = new Date(objectA.createdTime).getTime();
        const timeB = new Date(objectB.createdTime).getTime();
        return timeA - timeB; // Change this if you want descending order
      });

      setTodoList(updatedList);

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
  // Toggle function to switch between ascending and descending
  const toggleSortOrder = () => {
    setIsAscending(!isAscending); // Toggle sort order
  };

  React.useEffect(() => {
    fetchData();
  }, [isAscending]); // Refetch data when sort order changes

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
                <button onClick={toggleSortOrder}>
                  Sort: {isAscending ? "Ascending" : "Descending"}
                </button>
                <hr />
                <AddTodoForm onAddTodo={addTodo} />
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
              </center>
            )
          }
        />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
