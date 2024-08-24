import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import React, { useState } from "react";
function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); //my new loading state
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

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]); // I will implement the POST method here to create a todos record on my airTable.
  };

  const removeTodo = (id) => {
    const newTodoList = todoList.filter((todo) => id !== todo.id);
    setTodoList(newTodoList);
  };

  return (
    /*used the Fragments <> </> inside the return function*/
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Todo List</h1>
          <AddTodoForm onAddTodo={addTodo} />
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        </>
      )}
    </>
  );
}

export default App;
