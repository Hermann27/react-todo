

// 1- Above this App() function, I created an array with some initial data and store it in a variable named todoList.
const todoList =[
    {id: 1,title:"Complete assignment"},
    {id: 2,title:"Attend at least one mentor session weekly"},
    {id: 3,title:"Do more Project"}
  ];
function TodoList(){

    return (
        <ul>
                   {/* Inside the JavaScript expression, map over your todoList array */ }
                      {
                        todoList.map((list_item)=>(
                          // here i am getting the list item for each object in my todoList array
                          <li key ={list_item.id}>{list_item.title}.</li>
                        ))                  
                      }
            </ul>

    );

}

export default TodoList;