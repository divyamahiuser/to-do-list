const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importing CORS middleware

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Using CORS middleware to handle cross-origin requests

// Define the Todo model
const Todo = mongoose.model('Todo', {
    content: String
});

// Routes

// Fetch all todos
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// Add a new todo
app.post('/todos', async (req, res) => {
    const todo = new Todo(req.body);
    await todo.save();
    res.json(todo);
});

// Update a todo by ID
app.put('/todos/:id', async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!todo) {
        return res.status(404).json({ message: "Todo not found!" });
    }
    res.json(todo);
});


// Delete a todo by ID
app.delete('/todos/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    if (!result) {
        return res.status(404).json({ message: "Todo not found!" });
    }
    res.json({ message: "Todo deleted successfully!" });
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
