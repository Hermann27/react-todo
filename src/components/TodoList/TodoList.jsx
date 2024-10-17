import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TodoListItem from "../TodoListItem/TodoListItem";
import style from "./TodoList.module.css";
import PropTypes from "prop-types";
import { format } from "date-fns";

function TodoList({ todoList, onRemoveTodo, fetchData }) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      fetchData("High"); // I am fetching the data on my AirTable with priority "High"
    } else {
      fetchData(); // I am fetching the data on my AirTable without any filter
    }
  }, [location, fetchData]);

  return (
    <table className={style.table}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Tasks Details</th>
          <th>Priority Level</th>
          <th>Created Time</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {todoList.map(({ id, title, details, priority, createdTime }) => (
          <TodoListItem
            key={id}
            id={id}
            title={title}
            details={details}
            priority={priority}
            createdTime={format(createdTime, "MMMM d, yyyy h:mm:ss a")}
            onRemoveTodo={onRemoveTodo}
          />
        ))}
      </tbody>
    </table>
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
