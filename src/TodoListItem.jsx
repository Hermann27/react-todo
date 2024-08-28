function TodoListItem({ id, title, onRemoveTodo }) {
  return (
    <tr>
      <td style={{ border: "1px solid black", padding: "8px" }}> {title} </td>
      <td style={{ border: "1px solid black", padding: "8px" }}>
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
