import { useEffect, useState } from 'react';
import { dkeeper_backend } from '../../declarations/dkeeper_backend';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";

function App() {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [notesList, setNotesList] = useState([]);

  // Просто викликаємо fetchData, ніяких ручних маніпуляцій з агентом
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const notes = await dkeeper_backend.getnotes();
      console.log("Отримано з бекенду:", notes); 
      setNotesList(notes);
    } catch (error) {
      console.error("Помилка fetchData:", error);
    }
  }

  async function addNote(event) {
    event.preventDefault();
    try {
      await dkeeper_backend.addnote(note.title, note.content);
      await fetchData();
      setNote({
        title: "",
        content: "",
      });
    } catch (error) {
      console.error("Помилка при додаванні:", error);
    }
  }

  function deleteNote(id) {
    setNotesList((prevState) => {
      return prevState.filter((value, index) => {
        return index !== id;
      });
    });
  }

  function handleInputEvent(event) {
    const { name, value } = event.target;
    setNote((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  return (
    <div>
      <Header />
      <CreateArea
        onAdd={addNote}
        onInputChange={handleInputEvent}
        noteState={note}
      />
      {notesList.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;