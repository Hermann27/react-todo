import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import React, { useState } from 'react';

function App() {
  const [todoList ,setTodoList ] = useState(JSON.parse(localStorage.getItem('savedTodoList')) || []);

  const addTodo =(newTodo) =>{
    setTodoList([...todoList,newTodo]);
  }

  React.useEffect(()=>{
    localStorage.setItem('savedTodoList',JSON.stringify(todoList))
  },[todoList])

   return (
    <>
      <div>
          <h1>Todo List</h1>
           <AddTodoForm onAddTodo={addTodo}/>
           <TodoList todoList ={todoList}/> 
      </div>     
    </>
  );
}

export default App
