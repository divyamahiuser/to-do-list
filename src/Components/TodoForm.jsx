import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import axios from 'axios'; // Importing axios for HTTP requests
// import './App.css';
import './Responsive.css';

export default function TodoForm() {

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:5001/todos');
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
  
    fetchTodos();
  }, []);
  

  const AddTodo = async (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      try {
        // Sending the new todo content to the backend
        const response = await axios.post('http://localhost:5001/todos', { content: input });

        // Updating the frontend's state with the new todo received from the backend
        setTodos([...todos, response.data]);
        setInput("");
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  // const RemoveTodo = (todo) => {
  //   const removeTodo = todos.filter((item) => item !== todo)
  //   setTodos(removeTodo)
  // };

  // const EditTodo = (newContext, index) => {
  //   if (newContext.trim() !== '') {
  //     const editTodo = [...todos]
  //     editTodo[index] = newContext
  //     setTodos(editTodo)
  //     setEditIndex(-1)
  //   }
  // };

  return (
    <div className='margin form-list'>
      <div className='margin text-div'>
        <h1 className='heading'>What's the Plan for Today?</h1>      
        <form className='margin' onSubmit={AddTodo}>
          <input 
            className='add-input'
            type = "text" 
            placeholder = 'Add a Todo'
            name = 'input'
            value = {input}
            onChange = {(e) => setInput(e.target.value)}
          />
          <button className='add-btn'>Add Todo</button>
        </form>
      </div>
      <TodoList 
        todos={todos}
        setTodos={setTodos}
        editIndex={editIndex}
        setEditIndex={setEditIndex}
      />
    </div>
  );
}