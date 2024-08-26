import TodoListItem from "./TodoListItem";
import "./App.css";

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <>
    <br/>
      <table className="todo-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {todoList.map(({ id, title }) => (
          <TodoListItem
            key={id}
            id={id}
            title={title}
            onRemoveTodo={onRemoveTodo}
          />
        ))}
        </tbody>
      </table>
    </>
  );
}

export default TodoList;
