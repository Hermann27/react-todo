import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import React, { useState } from 'react';


function App() {
  const [todoList ,setTodoList ] = useState([]);
  const [isLoading,setisLoading] =useState(true);//my new loading state
  //JSON.parse(localStorage.getItem('savedTodoList')) || 
  
  
  React.useEffect(()=>{
    new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve({data:{todoList:JSON.parse(localStorage.getItem('savedTodoList')) || []}})
      },2000);
    })
    .then((result)=>{
      setTodoList(result.data.todoList);
      setisLoading(false);
    })
  })

  React.useEffect(()=>{
    if(!isLoading){
      localStorage.setItem('savedTodoList',JSON.stringify(todoList))
    }
  },[todoList,isLoading]);

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
