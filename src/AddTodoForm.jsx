
function AddTodoForm({onAddTodo}){

    const handleAddTodo =(event) =>{
      event.preventDefault(); //this line will Prevent the default form submission behavior
      //const todoTitlee = event.target.elements.title.value;
      const formData = new FormData(event.currentTarget);
      const todoTitle = formData.get('title');
      onAddTodo(todoTitle);// Call the passed function to add the todo
      event.target.reset(); // This action will reset the form
    }
    return(
        <div>
            <form onSubmit={handleAddTodo}>
                <label htmlFor='Title'>Title:</label> 
                <input type="text" name="title" />
            </form>           
        </div>
      
    )
}

export default AddTodoForm