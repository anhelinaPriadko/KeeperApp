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

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
  try {
    const notes = await dkeeper_backend.getnotes();
    console.log("Отримано з бекенду:", notes); // <--- ЦЕ ДУЖЕ ВАЖЛИВО
    setNotesList(notes);
  } catch (error) {
    console.error("Помилка fetchData:", error);
  }
}

  async function addNote(event) {
    await dkeeper_backend.addnote(note.title, note.content);
    setNotesList((prevState) => {
      return [...prevState, note];
    });
    setNote({
      title: "",
      content: "",
    });

    event.preventDefault();
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
      {notesList.map((note, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;