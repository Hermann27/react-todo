
import TodoListItem from './TodoListItem'

// 1- Above this App() function, I created an array with some initial data and store it in a variable named todoList.
const todoList =[
    {id: 1,title:"Complete assignment"},
    {id: 2,title:"Attend at least one mentor session weekly"},
    {id: 3,title:"Do more Project"}
  ];
function TodoList(){

    return (
            <ul>  
              {
                todoList.map((item)=>(
                  <TodoListItem key={item.id} todo={item}/>
                ))
              }                     
            </ul>
    );
}

export default TodoList;