import React, { useState, useEffect, useCallback } from "react";
import TodoList from "../TodoList/TodoList";
import AddTodoForm from "../AddTodoForm/AddTodoForm";
import style from "./TodoContainer.module.css";
import { useLocation } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

function TodoContainer() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [selectedItem, setSelectedItem] = useState("");
  const location = useLocation();

  const fetchData = useCallback(async (priority = null) => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };
    const customUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    const url = priority
      ? `${customUrl}?filterByFormula={priority}="${priority}"`
      : customUrl; // No filter for Home route

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();

      // Store todos from fetched data
      const todos = data.records.map((record) => ({
        title: record.fields.title,
        details: record.fields.details, // Pass details
        priority: record.fields.priority, // Pass priority
        createdTime: record.fields.createdTime, // Include createdTime
        id: record.id,
      }));
      console.log(todos);
      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  }, []);
  const toggleSortOrder = (eventKey) => {
    console.log(`Selected: ${eventKey}`);
    setSelectedItem(eventKey);
    if (eventKey === "Created Time") {
      setIsAscending((isAscending) => !isAscending);
      setTodoList((todoList) =>
        [...todoList].sort((objectA, objectB) => {
          const timeA = new Date(objectA.createdTime).getTime();
          const timeB = new Date(objectB.createdTime).getTime();
          return isAscending ? timeB - timeA : timeA - timeB; // Switch between Ascending/Descending
        })
      );
    } else {
      setIsAscending((isAscending) => !isAscending);
      setTodoList((todoList) =>
        [...todoList].sort((objectA, objectB) => {
          const titleA = objectA.title.toLowerCase(); // Normalize to lowercase to avoid case-sensitive sorting
          const titleB = objectB.title.toLowerCase();
          if (isAscending) {
            return titleA.localeCompare(titleB); // Ascending
          } else {
            return titleB.localeCompare(titleA); // Descending
          }
        })
      );
    }
  };
  const addTodo = async (newTodo) => {
    const formattedCompletedAt = new Date(newTodo.completedAt)
      .toISOString()
      .split("T")[0];
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          title: newTodo.title,
          details: newTodo.details, // Pass details
          priority: newTodo.priority, // Pass priority
          completedAt: formattedCompletedAt,
        },
      }),
    };
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      const addedTodo = {
        title: data.fields.title,
        details: data.fields.details, // Pass details
        priority: data.fields.priority, // Pass priority
        completedAt: data.fields.completedAt,
        createdTime: data.fields.createdTime, // Include createdTime
        id: data.id,
      };
      // Automatically sort the list after adding a new todo
      setTodoList((todoList) => {
        const updatedList = [...todoList, addedTodo].sort(
          (objectA, objectB) => {
            const timeA = new Date(objectA.createdTime).getTime();
            const timeB = new Date(objectB.createdTime).getTime();
            return isAscending ? timeA - timeB : timeB - timeA;
          }
        );
        return updatedList;
      });
      setMessage("Todo added successfully!");
    } catch (error) {
      setMessage(`Error adding todo: ${error.message}`);
    }
  };

  const removeTodo = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${id}`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const newTodoList = todoList.filter((todo) => id !== todo.id);
      setTodoList(newTodoList);
      setMessage("Todo removed successfully!");
    } catch (error) {
      setMessage(`Error removing todo: ${error.message}`);
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      fetchData("High"); // I am fetching the data on my AirTable with priority "High"
    } else {
      fetchData(); // I am fetching the data on my AirTable without any filter
    }
  }, [location, fetchData]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className={style.container}>
      {message && <p>{message}</p>}
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <Dropdown onSelect={toggleSortOrder}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Sort {selectedItem} by :{" "}
                {selectedItem ? (isAscending ? "Ascending" : "Descending") : ""}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="Title">Title</Dropdown.Item>
                <Dropdown.Item eventKey="Created Time">
                  Created Time
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-12 col-md-6">
            <AddTodoForm onAddTodo={addTodo} />
          </div>
        </div>
        <br />
        <h1>Todo List</h1>
        <div className="row">
          <TodoList
            todoList={todoList}
            onRemoveTodo={removeTodo}
            fetchData={fetchData}
          />
        </div>
        <br />
      </div>
    </div>
  );
}
export default TodoContainer;
