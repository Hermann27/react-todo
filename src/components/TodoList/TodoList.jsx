import TodoListItem from "../TodoListItem/TodoListItem";
import style from "./TodoList.module.css";
import PropTypes from "prop-types";
import { format } from "date-fns";

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <div className={style.tableContainer}>
      <br />
      <table className={style.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Created Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todoList.map(({ id, title, createdTime }) => (
            <TodoListItem
              key={id}
              id={id}
              title={title}
              createdTime={format(createdTime, "MMMM d, yyyy h:mm:ss a")}
              onRemoveTodo={onRemoveTodo}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;
