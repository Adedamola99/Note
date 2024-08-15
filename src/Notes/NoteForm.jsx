import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NoteForm = ({ addNote, currentNote, }) => {
  const [noteContent, setNoteContent] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await addNote(title, description, noteContent);
    setIsLoading(false);
    navigate('/');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="px-8 py-6">
      <div className="flex justify-between flex-wrap">
        <button
            className="font-mono font-medium bg-black text-gray-200 px-2 py-1 rounded"
            onClick={handleBack}
        >
            Back
        </button>

        <button
          className="font-mono font-medium bg-black text-gray-200 px-2 py-1 rounded-lg"
          onClick={() => {
            setTitle('');
            setDescription('');
            setNoteContent('');
          }}
        >
          New File
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-6 flex flex-col gap-2">
          <div className="flex gap-1">
            <h1 className="text-xl font-serif font-bold">Title:</h1>
            <input 
                type="text" 
                name="title" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="border-transparent bg-transparent outline-none w-full text-xl font-serif font-bold"
                placeholder="e.g My Last Day At School" 
                required 
            />
          </div>

          <div className="flex gap-1">
            <p className="font-mono font-bold">Description:</p>
            <input 
                type="text" 
                name="description"
                value={description}
                onChange={e => setDescription(e.target.value)} 
                className="border-transparent bg-transparent outline-none w-full font-mono font-bold"
                placeholder="e.g A review on how I spent my last day in school"  
                required
            />
          </div>
        </div>

        <h2 className="font-mono mt-3 font-bold text-3xl">Content</h2>

        <textarea 
            name="content" 
            id="content" 
            value={noteContent}
            onChange={e => setNoteContent(e.target.value)}
            className="custom-scrollbar w-full min-h-64 p-3 mt-2 bg-teal-100"
            placeholder="Type something here..."
            required
        />

        <button className="mt-4 font-mono font-medium bg-black text-gray-200 px-2 py-1">
        {isLoading ? 'Loading...' : currentNote ? 'Update Note' : 'Add Note'}
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
