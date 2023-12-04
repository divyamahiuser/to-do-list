import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Responsive.css';

export default function TodoList({ todos, setTodos, editIndex, setEditIndex }) {
  // const [todos, setTodos] = useState([]);
  // const [editIndex, setEditIndex] = useState(-1);
  const [editContent, setEditContent] = useState(''); // To store the current editing content

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
  }, [setTodos]);

  const handleEditChange = (e) => {
    setEditContent(e.target.value);
  };

  const handleEditSave = async (index) => {
    const todoToUpdate = todos[index];
    todoToUpdate.content = editContent;
    
    try {
      await axios.put(`http://localhost:5001/todos/${todoToUpdate._id}`, todoToUpdate);
      const updatedTodos = [...todos];
      updatedTodos[index] = todoToUpdate;
      setTodos(updatedTodos);
      setEditIndex(-1);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleRemove = async (item) => {
    try {
      await axios.delete(`http://localhost:5001/todos/${item._id}`);
      const updatedTodos = todos.filter(todo => todo._id !== item._id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <ol className="margin list-div">
      {todos.map((item, index) => (
        <div className="margin list" key={item._id}>
          {index === editIndex ? (
            <div className='edit-list'>
              <input 
                className='edit-input' 
                type="text" 
                value={editContent} 
                onChange={handleEditChange}
              />
              <div className='icon-div'>
                <i 
                  onClick={() => handleEditSave(index)} 
                  className="icons-CW fa fa-check"
                ></i>
                <button 
                  className='edit-btns'
                  onClick={() => handleEditSave(index)}
                >Save</button>
                <i onClick={() => setEditIndex(-1)} className="icons-CW fa fa-close"></i>
                <button className='edit-btns' onClick={() => setEditIndex(-1)}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className="main-list">
              <li className='list-wrap'>{item.content}</li>
              <div className="icon-div">
                <i onClick={() => handleRemove(item)} className="fa fa-trash-o"></i>
                <i 
                  onClick={() => {
                    setEditContent(item.content);
                    setEditIndex(index);
                  }} 
                  className="fa fa-edit"
                ></i>
              </div>
            </div>
          )}
        </div>
      ))}
    </ol>
  );
}
