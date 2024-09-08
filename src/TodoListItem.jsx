import style from "./TodoListItem.module.css"; // Import the CSS module

function TodoListItem({ id, title, onRemoveTodo }) {
  return (
    <tr className={style.ListItem}>
      <td>{title}</td>
      <td>
        <center>
          <button type="button" onClick={() => onRemoveTodo(id)}>
            Remove
          </button>
        </center>
      </td>
    </tr>
  );
}
export default TodoListItem;
