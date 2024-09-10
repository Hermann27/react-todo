import TodoListItem from "../TodoListItem/TodoListItem";
import style from "./TodoList.module.css";

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <>
      <br />
      <table className={style.table}>
        <thead>
          <tr>
            <th className="todo-table th">Title</th>
            <th className="todo-table th">Actions</th>
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
