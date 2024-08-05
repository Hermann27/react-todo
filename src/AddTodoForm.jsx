import { useState } from "react";
import InputWithLabel from "./InputWithLabel";

function AddTodoForm({onAddTodo}){
    const [todoTitle ,setTodoTitle ] = useState('');

    const handleTitleChange = (event) =>{
       const newTodoTitle = event.target.value; //get the input value from tu user.
       setTodoTitle(newTodoTitle); // set that value to our setTodoTitle that will update the state of our variable todoTitle.
    }

    const handleAddTodo =(event) =>{
        event.preventDefault(); //this line prevent the default form submission behavior
        onAddTodo({title:todoTitle,id:Date.now()});// update the onAddTodo callback prop to pass an Object instead of a String; Object should have the following properties{title:value,id:value}
        setTodoTitle(''); // Reseted the todoTitle state.
    }
    return(
        <form onSubmit={handleAddTodo}>
            <InputWithLabel 
                todoTitle={todoTitle} 
                handleTitleChange ={handleTitleChange}
            >Title:</InputWithLabel>
            
            <button type="submit">Add</button>
        </form>
    );
}

export default AddTodoForm;