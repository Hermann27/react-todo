import { useEffect, useRef } from "react";
import style from "./InputWithLabel.module.css"; // Import the CSS module
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function InputWithLabel({ todoTitle, handleTitleChange, children }) {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">{children}</InputGroup.Text>
        <Form.Control
          placeholder="Enter new todo"
          aria-label="title"
          name="title"
          type="text"
          onChange={handleTitleChange}
          value={todoTitle}
          aria-describedby="basic-addon1"
          ref={inputRef}
        />
      </InputGroup>
    </>
  );
}

InputWithLabel.propTypes = {
  todoTitle: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default InputWithLabel;
