import React, { useState, useEffect } from 'react';
import { analyzeTask, getAutoCompletion } from '../utils/openAi';

const TodoForm = ({ addTodo, editTodo }) => {
  const [text, setText] = useState('');
  const [predictedText, setPredictedText] = useState('');
  const [timeFrame, setTimeFrame] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editTodo) {
      setText(editTodo.text);
      setTimeFrame(editTodo.timeFrame || '');
    }
  }, [editTodo]);

  const handleInputChange = async (e) => {
    const inputText = e.target.value;
    setText(inputText);

    if (inputText.length > 3) {
      const prediction = await getAutoCompletion(inputText);
      setPredictedText(prediction);
    } else {
      setPredictedText('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const priority = await analyzeTask(text);
    if (!text.trim()) return;
    addTodo({ text, timeFrame, priority });
    setText('');    
    setPredictedText('');
    setTimeFrame('');
    setLoading(false)
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mt-4">
      <div className="mb-4">
        <label className="block text-gray-700">Task</label>
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="What needs to be done?"
        />

        {predictedText && (
            <div className="mt-2 text-gray-500">
            <p>Did you mean: <span className="font-semibold">{predictedText}</span>?</p>
            </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Time Frame (optional)</label>
        <input
          type="text"
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="E.g., 2 days"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" disabled={loading}>
        {loading ? 'Adding' : editTodo ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TodoForm;
