import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { useState } from 'react';

function App() {
  const [todoList ,setTodoList ] = useState([]);

  const addTodo =(newTodo) =>{
    setTodoList([...todoList,newTodo]);
  }

   return (
    <>
      <div>
          <h1>Todo List</h1>
           <TodoList todoList ={todoList}/> 
           <AddTodoForm onAddTodo={addTodo}/>
      </div>     
    </>
  );
}

export default App
