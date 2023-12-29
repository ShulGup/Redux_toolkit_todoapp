const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

// In-memory database for storing todos
const todos = [];

// Middleware to generate a unique ID for each request
const generateUniqueId = (req, res, next) => {
  req.body.id = uuidv4();
  next();
};

// Endpoint to get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Endpoint to add a new todo
app.post("/todos", generateUniqueId, (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Endpoint to update a todo (PUT)
app.put("/todos/:id", (req, res) => {
  const todoId = req.params.id;
  const updatedTodo = req.body;

  // Find the todo in the array and update it
  const index = todos.findIndex((todo) => todo.id === todoId);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...updatedTodo };
    res.json(todos[index]);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

// Endpoint to update a todo (PATCH)
app.patch("/todos/:id", (req, res) => {
  const todoId = req.params.id;
  const updatedFields = req.body;

  // Find the todo in the array and update specific fields
  const index = todos.findIndex((todo) => todo.id === todoId);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...updatedFields };
    res.json(todos[index]);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

// Endpoint to delete a todo
app.delete("/todos/:id", (req, res) => {
  const todoId = req.params.id;

  // Remove the todo from the array
  const index = todos.findIndex((todo) => todo.id === todoId);
  if (index !== -1) {
    const deletedTodo = todos.splice(index, 1);
    res.json(deletedTodo[0]);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
