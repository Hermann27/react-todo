import { useState } from "react";
import InputWithLabel from "../InputWithLabel/InputWithLabel";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDetails, setTodoDetails] = useState(""); // New state for details
  const [todoPriority, setTodoPriority] = useState("Low"); // New state for priority
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  const handleDetailsChange = (event) => {
    setTodoDetails(event.target.value); // Update the state for details
  };

  const handlePriorityChange = (event) => {
    setTodoPriority(event.target.value); // Update the state for priority
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (todoTitle.trim() === "") {
      alert("Please enter a title for the todo item.");
      return;
    }

    onAddTodo({
      title: todoTitle,
      details: todoDetails, // Pass details
      priority: todoPriority, // Pass priority
      completedAt: Date.now(),
    });

    // Reset the form fields
    setTodoTitle("");
    setTodoDetails("");
    setTodoPriority("Low");
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add New Todo
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Todo List App</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Title Input */}
            <Form.Group className="mb-3" controlId="formTodoTitle">
              <InputWithLabel
                todoTitle={todoTitle}
                handleTitleChange={handleTitleChange}
              >
                Title :
              </InputWithLabel>
            </Form.Group>

            {/* Details Input */}
            <Form.Group className="mb-3" controlId="formTodoDetails">
              <Form.Label>Details:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={todoDetails}
                onChange={handleDetailsChange}
              />
            </Form.Group>
            {/* Priority Dropdown */}
            <Form.Group className="mb-3" controlId="formTodoPriority">
              <Form.Label>Priority:</Form.Label>
              <Form.Select value={todoPriority} onChange={handlePriorityChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddTodo}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
