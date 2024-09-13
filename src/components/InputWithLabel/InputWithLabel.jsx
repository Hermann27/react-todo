import { useEffect, useRef } from "react";
import style from "./InputWithLabel.module.css"; // Import the CSS module

function InputWithLabel({ todoTitle, handleTitleChange, children }) {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });
  return (
    <>
      <label htmlFor="Title">{children}</label>
      <input
        name="title"
        type="text"
        value={todoTitle}
        onChange={handleTitleChange}
        placeholder="Enter new todo"
        ref={inputRef}
      />
    </>
  );
}
export default InputWithLabel;
