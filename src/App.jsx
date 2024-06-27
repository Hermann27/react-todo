import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { useState } from 'react';

function App() {

  const [newTod, SetNewTodo] = useState([]);

  
   return (
    <>
      <div>
          <h1>Todo List</h1>
           <TodoList/> 
           <AddTodoForm onAddTodo={3}/>
      </div>     
    </>
  );
}

export default App
