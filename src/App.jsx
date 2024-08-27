import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import React, { useState } from "react";
function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); //my new loading state
  const [message, setMessage] = useState("");
  const fetchData = async () => {
    // Define the fetchData function
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`; //API url where we will fetched the data.
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json(); // This convert the response to a JavaScript object
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
      const timer = setTimeout(() => setMessage(""), 2000);
      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [message]);
  const addTodo = async (newTodo) => {
    const formattedCompletedAt = new Date(newTodo.completedAt)
      .toISOString()
      .split("T")[0]; // Format completedAt to a date string (ISO(YYYY-MM-DD) format)
    // Define the POST request options
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          title: newTodo.title,
          completedAt: formattedCompletedAt, // I ensured that the date is in YYYY-MM-DD format as my airTable.
        },
      }),
    };
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`; //API URL for Airtable
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      // Add the new todo returned from Airtable to the todoList
      const addedTodo = {
        title: data.fields.title,
        completedAt: data.fields.completedAt,
        id: data.id, // Airtable returns the ID of the newly created record
      };
      setTodoList([...todoList, addedTodo]); // updated /added my todolist state
      setMessage("Todo added successfully!"); // Set success message
    } catch (error) {
      //console.error("Error adding todo:", error.message);
      setMessage(`Error adding todo: ${error.message}`); // Set error message
    }
  };
  const removeTodo = async (id) => {
    // Define the DELETE request options
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}/${id}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const newTodoList = todoList.filter((todo) => id !== todo.id); // If the deletion was successful, remove the todo from the state
      setTodoList(newTodoList);
      setMessage("Todo removed successfully!"); // Set success message
    } catch (error) {
      //console.error("Error removing todo:", error.message);
      setMessage(`Error removing todo: ${error.message}`); // Set error message
    }
  };
  return (
    /*used the Fragments <> </> inside the return function*/
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <center>
            <h1>Todo List</h1>
            {message && <p>{message}</p>}          
            {/* Display success or error message */}
            <AddTodoForm onAddTodo={addTodo} />
            <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
          </center>
        </>
      )}
    </>
  );
}
export default App;
