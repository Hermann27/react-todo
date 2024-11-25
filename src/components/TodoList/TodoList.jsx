import TodoListItem from "../TodoListItem/TodoListItem";
import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";
import { format } from "date-fns";

function TodoList({ todoList, onRemoveTodo, fetchData }) {
  return (
    <div className="table-responsive">
      <Table responsive="sm">
        <thead className="table-light">
          <tr className="table-dark table table-striped">
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
      </Table>
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
