function AddTodoForm({onAddTodo}){

    const handleAddTodo =(event) =>{
        event.preventDefault(); //this line will Prevent the default form submission behavior
        //const todoTitlee = event.target.elements.title.value;
        const formData = new FormData(event.currentTarget);
        const todoTitle = formData.get('title');
        onAddTodo(todoTitle);// Call the passed function to add the todo
        //console.log(todoTitle);
        event.target.reset(); // This action will reset the form

    }
    return(
        <form onSubmit={handleAddTodo}>
            <label htmlFor="Title">Title :</label>
            <input name="title" type="text"/>
            <button type="submit">Add</button>
        </form>
    );
}

export default AddTodoForm;