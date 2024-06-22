# All about this project 

# -------------------------------------(Step by Step)Lesson 1-1------------------------------------------------------------------
# Commit project and create working branch
  1. Commit the installed project
  2. Push changes to GitHub repo
  3. Create and checkout a working branch with the name of lesson_1_1
  4. Publish that branch to GitHub and start coding!

# Create the beginnings of the todo list

## React Components and JSX
  1. Open the src/App.jsx file
  2. Remove the existing JSX from the component
  3. Create a level-one heading that says "Todo List"
  4. Create an unordered list (ul)

## Lists in React
  1. Above the App() function, create an empty Array and store it in a variable named todoList
  2. Inside the Array, create at least 3 Objects with the following properties:
      id: unique identifier (ex. 1, 2, 3)
      title: summary of the todo item (ex. "Complete assignment")
  3. Inside your unordered list, insert a JavaScript expression
      hint: {}
  4. Inside the JavaScript expression, map over your todoList array
  5. For each Object in the Array, return a list item (li) with the following:
      key attribute with value of id property
      inner text content with value of title property

# -------------------------------------(Step by Step) Lesson 1-2 ------------------------------------------------------------------

# Move List Item into New "Todo List Item" Component
  1. Inside /src directory, create a new file called TodoListItem.jsx
  2. Open /src/TodoListItem.jsx
  3. Create a new functional React component (see below)
      1. Declare a function named TodoListItem
      2. Export TodoListItem function as default module
  4. Add a multi-line return statement to your TodoListItem function (this is where we will insert JSX)
      ## hint: use parenthesis for multi-line return
  5. Move list item JSX from TodoList.jsx to TodoListItem.jsx (see below)
      1. Open /src/TodoList.jsx
      2. Cut (copy and remove) the list item element (<li>)
      3. Open /src/TodoListItem.jsx
      4. Inside the multi-line return, paste the list item element (<li>)
      5. Remove the key attribute
  6. Refactor TodoList.jsx to use new TodoListItem component (see below)
      1. Open /src/TodoList.jsx
      2. Import TodoListItem
      3. Inside the map() method, use the TodoListItem component
          1. Pass key as a prop equal to the id of the todo object
          2. Pass todo as a prop
  7. Update TodoListItem component to use props (see below)
      1. Open /src/TodoListItem.jsx
      2. Add props as a parameter in the TodoListItem function
      3. Update the todo object reference to come from props
  8. Run your application and view in browser
      8. Verify that your Todo List still appears correctly


# Handle "Add Todo Form" Submit
  1. Open /src/AddTodoForm.jsx
  2. Add a name attribute to the text input with value title
  3. Inside the AddTodoForm functional component, above the return statement, create a new function called handleAddTodo that takes event as a parameter
      1. First, inside this function, prevent the default behavior of the form submit
          ## hint: preventDefault method
      2. Next, retrieve the value of the title element from the event target and store it in a variable named todoTitle
      3. Log the value of todoTitle in the console
      4. Finally, reset the form so the text input value is cleared
  4. Add onSubmit prop to form element and pass the handleAddTodo function by reference
  5. View your application in browser
  6. Enter a value in the text input and submit the form
      1. Verify that the value you entered is visible in the console
      2. Verify that form is cleared properly


# Store "New Todo" in React State
  1. Open /src/App.jsx
  2. Inside the App functional component, above the return statement, create a new state variable named newTodo with update function named setNewTodo
    ## hint: useState hook
  3. Below the <AddTodoForm /> component, add a paragraph element that displays the value of newTodo variable
  4. Pass setNewTodo as a callback handler prop named onAddTodo to the AddTodoForm component
  5. Open /src/AddTodoForm.jsx
  6. Add props as a parameter in the AddTodoForm function
  7. Inside the handleAddTodo function, invoke the onAddTodo callback prop and pass todoTitle as an argument
  8. View your application in browser
  9. Enter a value in the text input and submit the form
      1. Verify that the value you entered is visible beneath the form