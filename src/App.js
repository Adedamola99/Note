import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import NoteWelcomePage from './Notes/NoteWelcomePage';
import Profile from './components/Profile';
import TodoList from './Todo/TodoList';
import Note from './Notes/Note';
import NoteForm from './Notes/NoteForm';
import { ThemeProvider } from './hooks/ThemeContext';

function App() {
  const [notes, setNote] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNote(savedNotes);
  }, []);

  useEffect(() => {
    if (notes && notes.length > 0) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes]);

  const addNote = (title, description, content, bookmark) => {
    setNote([
      ...notes,
      {
        id: Date.now(),
        title,
        description,
        content,
        bookmarked: bookmark
      }
    ]);
  };

  const deleteNote = (id) => {
    setNote(notes.filter(item => item.id !== id));
  };

  const updateNote = (id, updatedTitle, updatedDescription, updatedContent) => {
    setNote(notes.map(item =>
      item.id === id ? { ...item, title: updatedTitle, description: updatedDescription, content: updatedContent } : item
    ));
  };

  return (
    <ThemeProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<NoteWelcomePage notes={notes} deleteNote={deleteNote} setCurrentNote={setCurrentNote} />} />
              <Route path='note/:id' element={<Note updateNote={updateNote} notes={notes} currentNote={currentNote} setCurrentNote={setCurrentNote} />} />
              <Route path='form' element={<NoteForm addNote={addNote} />} />
              <Route path='profile' element={<Profile />} />
              <Route path='todo' element={<TodoList />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
