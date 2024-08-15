import React from 'react';
import { FaTrash, FaCheck, FaEdit } from 'react-icons/fa';

const TodoItem = ({ todo, deleteTodo, updateStatus, editTask }) => {
  return (
    <li className={`flex justify-between items-center p-4 mb-2 rounded shadow ${todo.status === 'Complete' ? 'bg-green-100' : 'bg-white'}`}>
      <div>
        <h3 className="font-semibold">{todo.text}</h3>
        <p className="text-sm text-gray-500">Added: {todo.addedAt}</p>
        <p className={`text-sm ${todo.priority === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>{todo.priority} priority</p>
        {todo.timeFrame && <p className="text-sm text-gray-500">Time Frame: {todo.timeFrame}</p>}
        <p className={`text-sm ${todo.status === 'Complete' ? 'text-green-500' : 'text-yellow-500'}`}>{todo.status}</p>
      </div>
      <div className="flex space-x-2">
        <button onClick={() => updateStatus(todo.id)} className="p-2 text-white bg-blue-500 rounded">
          <FaCheck />
        </button>
        <button onClick={() => editTask(todo)} className="p-2 text-white bg-yellow-500 rounded">
          <FaEdit />
        </button>
        <button onClick={() => deleteTodo(todo.id)} className="p-2 text-white bg-red-500 rounded">
          <FaTrash />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
