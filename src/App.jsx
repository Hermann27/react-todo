import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import React, { useState } from 'react';
function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setisLoading] = useState(true); //my new loading state
  const fetchData = async() => { // Define the fetchData function
    const options = {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}` },
    };
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`; //API url where we will fetched the data.
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json(); // This convert the response to a JavaScript object
        const todos = data.records.map(record => ({
            title: record.fields.title,
            id: record.id,
        }));
        setTodoList(todos);
        setisLoading(false);
    } catch (error) {
        console.error(error.message);
    }
};
  React.useEffect(() => {
    //Loading delay with a Promise
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {         
            todoList:Array(fetchData())|| [] //JSON.parse(localStorage.getItem("savedTodoList")) || []
          },
        });
      }, 2000);
    }).then((result) => {
      setTodoList(result.data.todoList);// updating the state with the fetchesd todolist
      setisLoading(false);// here I am turn off the loading state
    });
  },[]);

  React.useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
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
