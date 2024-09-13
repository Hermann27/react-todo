import style from "./TodoListItem.module.css"; // Import the CSS module

function TodoListItem({ id, title, onRemoveTodo }) {
  return (
    <tr className={style.listItem}>
      <td className={style.tableCells}>{title}</td>
      <td className={style.tableCells}>
        <button type="button" onClick={() => onRemoveTodo(id)}>
          Remove
        </button>
      </td>
    </tr>
  );
}
export default TodoListItem;
