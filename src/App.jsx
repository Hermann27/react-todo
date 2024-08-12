import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import React, { useState } from 'react';


function App() {
  const [todoList ,setTodoList ] = useState(JSON.parse(localStorage.getItem('savedTodoList')) || []);
  
  React.useEffect(()=>{
    localStorage.setItem('savedTodoList',JSON.stringify(todoList))
  },[todoList]);
  
  const addTodo =(newTodo) =>{
    setTodoList([...todoList,newTodo]);
  };

  const removeTodo =(id)=>{
    const newTodoList = todoList.filter(
      (todo)=> id !== todo.id
    );
    setTodoList(newTodoList);
  }

   return (  
     /*used the Fragments <> </> inside the return function*/ 
        <> 
          <h1>Todo List</h1>
          <AddTodoForm onAddTodo={addTodo}/>
          <TodoList todoList ={todoList} onRemoveTodo={removeTodo}/>    
        </>
  );
}

export default App;
