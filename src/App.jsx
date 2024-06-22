import React,{ useState } from 'react'
import './TodoListItem'
import TodoListItem from './TodoListItem'
import AddTodoFrom from'./AddTodoForm'

// 1- Above this App() function, I created an array with some initial data and store it in a variable named todoList.
const todoList =[
  {id: 1,title:"Complete assignment"},
  {id: 2,title:"Attend at least one mentor session weekly"},
  {id: 3,title:"Do more Project"}
];

function App() {

  const[newTodo ,setnewTodo ] = React.useState([]);

  
  const setNewTodo =(todoTitle) =>{
    setnewTodo(todoTitle);   
  }

   return (
    <>
      <div>
          <h1>Todo List</h1>
          <AddTodoFrom onAddTodo= {setNewTodo}/>
          <p>
            {newTodo}
          </p>
            <ul>
                   {/* Inside the JavaScript expression, map over your todoList array */ }
                      {
                        todoList.map((list_item)=>(
                          // here i am getting the list item for each object in my todoList array
                          <TodoListItem key={list_item.id} todo = {list_item}/>
                        ))                  
                      }
            </ul>
      </div>     
    </>
  );
}

export default App
