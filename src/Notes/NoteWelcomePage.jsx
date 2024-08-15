// NoteWelcomePage.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/ThemeContext";

const NoteWelcomePage = ({ notes, deleteNote, setCurrentNote }) => {
  const [bookmarkedNotes, setBookmarkedNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isNightMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarkedNotes")) || [];
    setBookmarkedNotes(storedBookmarks);
  }, []);

  const handleBookmarkNote = (noteItem) => {
    let updatedBookmarks;
    if (bookmarkedNotes.some((note) => note.id === noteItem.id)) {
      updatedBookmarks = bookmarkedNotes.filter((note) => note.id !== noteItem.id);
    } else {
      updatedBookmarks = [...bookmarkedNotes, noteItem];
    }
    setBookmarkedNotes(updatedBookmarks);
    localStorage.setItem("bookmarkedNotes", JSON.stringify(updatedBookmarks));
  };

  const handleViewNote = (noteItem) => {
    setCurrentNote(noteItem);
    navigate(`note/${noteItem.id}`);
  };

  const goToNote = () => {
    navigate('form');
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    note.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-8 py-6">
      <div className="flex justify-between align-middle">
        <h1 className={`text-3xl font-serif font-bold ${isNightMode ? 'text-white' : 'text-black'}`}>My Journal</h1> 
        <input 
          className={`p-1 ${isNightMode ? 'bg-gray-500 text-white' : 'bg-green-200'} rounded`} 
          type="search" 
          name="search" 
          id="search" 
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />     
        <button 
          className={`font-mono font-medium bg-black ${isNightMode ? 'text-white' : 'text-gray-200'} px-2 py-1 rounded-lg`} 
          onClick={goToNote}
          type="button"
        >
          Create New Note
        </button>
      </div>

      <div className="mt-4 font-thin">
        <p className={`${isNightMode ? 'text-white' : 'text-black'}`}>Use AI to suggest what to write ✨</p>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {filteredNotes.map(noteItem => (
          <div key={noteItem.id} className={`flex flex-col gap-2 shadow-md rounded-lg ${isNightMode ? 'bg-gray-500' : 'bg-green-50'} p-4`}>
            <div className="flex gap-4">
              <img src="./assets/images/Note.png" alt="" className="flex justify-start" />
              <div className="flex flex-col gap-1 font-mono">
                <h1 className={`text-2xl ${isNightMode ? 'text-white' : 'text-black'}`}>{noteItem.title}</h1>
                <p className={`${isNightMode ? 'text-white' : 'text-black'}`}>{noteItem.description}</p>
              </div>
            </div>   

            <div className="flex gap-2 justify-end">
              <img
                src="./assets/icons/eye-icon.svg"
                alt=""
                className="w-4 h-4 cursor-pointer"
                onClick={() => handleViewNote(noteItem)}
              />

              <svg 
                xmlns="http://www.w3.org/2000/svg"  
                className="w-4 h-4 cursor-pointer"
                onClick={() => handleBookmarkNote(noteItem)}
                viewBox="0 0 24 24" width="30px" height="30px">
                <path fill={bookmarkedNotes.some((note) => note.id === noteItem.id) ? "red" : "black"} d="M 6 2 C 5.861875 2 5.7278809 2.0143848 5.5976562 2.0410156 C 4.686084 2.2274316 4 3.033125 4 4 L 4 22 L 12 19 L 20 22 L 20 4 C 20 3.8625 19.985742 3.7275391 19.958984 3.5976562 C 19.799199 2.8163086 19.183691 2.2008008 18.402344 2.0410156 C 18.272119 2.0143848 18.138125 2 18 2 L 6 2 z"/>
              </svg>

              <img 
                src="./assets/icons/delete-icon.svg" 
                alt="" className="w-4 h-4 cursor-pointer" 
                onClick={() => deleteNote(noteItem.id)} 
              />
            </div>
          </div>
        ))}
      </div>

      {notes.length === 0 && (
        <div className="flex align-middle justify-center mt-36">
          <p className="font-mono text-2xl font-extrabold">No Note yet_</p>
        </div>
      )}
    </div>
  );
}

export default NoteWelcomePage;
