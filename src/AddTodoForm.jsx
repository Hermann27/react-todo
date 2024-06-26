function AddTodoForm(){

    return(
        <form>
            <label htmlFor="Title">Title :</label>
            <input id="todoTitle" type="text"/>
            <button type="submit">Add</button>
        </form>
    );
}

export default AddTodoForm;