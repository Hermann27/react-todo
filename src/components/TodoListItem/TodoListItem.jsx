import style from "./TodoListItem.module.css"; // Import the CSS module
import PropTypes from "prop-types";

function TodoListItem({ id, title, createdTime, onRemoveTodo }) {
  return (
    <tr className={style.listItem}>
      <td className={style.tableCells}>{title}</td>
      <td className={style.tableCells}>{createdTime}</td>
      <td className={style.tableCells}>
        <button type="button" onClick={() => onRemoveTodo(id)}>
          Remove
        </button>
      </td>
    </tr>
  );
}
TodoListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
