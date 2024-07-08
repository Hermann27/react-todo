import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { useState } from 'react';

function App() {

  const [newTodo, setnewTodo] = useState([]);

  const SetNewTodo =(todoTitle) =>{
    setnewTodo(todoTitle);   
  }

   return (
    <>
      <div>
          <h1>Todo List</h1>
           <TodoList/> 
           <AddTodoForm onAddTodo={SetNewTodo}/>
           <p>
            {newTodo}
          </p>
      </div>     
    </>
  );
}

export default App
