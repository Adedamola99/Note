import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../hooks/ThemeContext";
const Note = ({ updateNote, currentNote, setCurrentNote, notes }) => {
  const [noteContent, setNoteContent] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isNightMode } = useTheme();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const foundNote = notes.find(note => note.id === parseInt(id));
      if (foundNote) {
        setCurrentNote(foundNote);
        setNoteContent(foundNote.content);
        setTitle(foundNote.title);
        setDescription(foundNote.description);
      }
    }
  }, [id, notes, setCurrentNote]);

  useEffect(() => {
    if (currentNote) {
      setNoteContent(currentNote.content);
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    } else {
      setNoteContent('');
      setTitle('');
      setDescription('');
    }
  }, [currentNote]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (currentNote) {
      updateNote(currentNote.id, title, description, noteContent);
    }
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const handleEdit = () => {
    setIsSubmitted(false);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="px-8 py-6">
      <div className="flex justify-between flex-wrap">
        {isSubmitted ? (
          <button
            className="font-mono font-medium bg-black text-gray-200 px-2 py-1 rounded"
            onClick={handleEdit}
            type="button"
          >
            Edit Note
          </button>
        ) : (
          <button
            className="font-mono font-medium bg-black text-gray-200 px-2 py-1 rounded"
            onClick={handleBack}
            type="button"
          >
            Back
          </button>
        )}
        <button
          className="font-mono font-medium bg-black text-gray-200 px-2 py-1 rounded-lg"
          onClick={() => {
            setTitle('');
            setDescription('');
            setNoteContent('');
            setIsSubmitted(false);
          }}
          type="button"
        >
          New File
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-6 flex flex-col gap-2">
          <div className="flex gap-1">
            <h1 className={`text-xl font-serif font-bold ${isNightMode ? 'text-white' : 'text-black'}`}>Title:</h1>
            {isSubmitted ? (
              <h1 className={`text-xl font-serif font-bold ${isNightMode ? 'text-white' : 'text-black'}`}>{title}</h1>
            ) : (
              <input 
                type="text" 
                name="title" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                className={`border-transparent bg-transparent outline-none w-full text-xl font-serif font-bold ${isNightMode ? 'text-white' : 'text-black'}`}
                placeholder="e.g My Last Day At School" 
                required 
              />
            )}
          </div>
          <div className="flex gap-1">
            <p className={`font-mono font-bold ${isNightMode ? 'text-white' : 'text-black'}`}>Description:</p>
            {isSubmitted ? (
              <p className={`font-mono font-bold ${isNightMode ? 'text-white' : 'text-black'}`}>{description}</p>
            ) : (
              <input 
                type="text" 
                name="description"
                value={description}
                onChange={e => setDescription(e.target.value)} 
                className={`border-transparent bg-transparent outline-none w-full font-mono font-bold ${isNightMode ? 'text-white' : 'text-black'}`}
                placeholder="e.g A review on how I spent my last day in school"  
                required
              />
            )}
          </div>
        </div>
        <h2 className={`font-mono mt-3 font-bold text-3xl ${isNightMode ? 'text-white' : 'text-black'}`}>Content</h2>
        {isSubmitted ? (
          <p className={`custom-scrollbar w-full min-h-64 ${isNightMode ? 'text-white' : 'text-black'} mt-2`}>{noteContent}</p>
        ) : (
          <textarea 
            name="content" 
            id="content" 
            value={noteContent}
            onChange={e => setNoteContent(e.target.value)}
            className="w-full min-h-64 mt-2 p-2"
            placeholder="Write your note here..."
            required
          />
        )}
        {!isSubmitted && (
          <button
            type="submit"
            className="font-mono font-medium bg-blue-500 text-gray-200 px-2 py-1 rounded-lg mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Note"}
          </button>
        )}
      </form>
    </div>
  );
};

export default Note;
