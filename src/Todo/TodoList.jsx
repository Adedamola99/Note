import React, { useState } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { useTheme } from '../hooks/ThemeContext';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  // const { isNightMode } = useTheme();

  const addTodo = (todo) => {
    if (editTodo) {
      setTodos(todos.map(t => t.id === editTodo.id ? { ...t, ...todo } : t));
      setEditTodo(null);
    } else {
      setTodos([...todos, { ...todo, id: Date.now(), status: 'In Progress', addedAt: new Date().toLocaleString() }]);
    }
    setShowForm(false);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateStatus = (id) => {
    setTodos(todos.map(todo => (
      todo.id === id ? { ...todo, status: todo.status === 'In Progress' ? 'Complete' : 'In Progress' } : todo
    )));
  };

  const editTask = (todo) => {
    setEditTodo(todo);
    setShowForm(true);
  };

  console.log(todos);

  return (
    <div className='px-8 py-6'>
      <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-blue-500 text-white rounded">
        {showForm ? 'Hide Form' : 'Add Task'}
      </button>
      {showForm && <TodoForm addTodo={addTodo} editTodo={editTodo} />}
      <ul className="mt-4">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            updateStatus={updateStatus}
            editTask={editTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
