# All about this project 
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
  5. For each Object in the Array, return a list item (<li>) with the following:
      key attribute with value of id property
      inner text content with value of title property
