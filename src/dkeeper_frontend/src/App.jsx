import { useEffect, useState } from 'react';
import { createActor, canisterId } from '../../declarations/dkeeper_backend';
import { HttpAgent } from "@dfinity/agent";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";

function App() {
  const [note, setNote] = useState({ title: "", content: "" });
  const [notesList, setNotesList] = useState([]);
  
  const [backendActor, setBackendActor] = useState(null);

  useEffect(() => {
      async function initAgent() {
        try {
          const agent = await HttpAgent.create({ host: "http://localhost:4943" });

          await agent.fetchRootKey();

          const actor = createActor(canisterId, { agent });
          setBackendActor(actor);
        } catch (error) {
          console.error("Помилка ініціалізації агента:", error);
        }
      }
      initAgent();
    }, []);

  useEffect(() => {
    if (backendActor) {
      fetchData();
    }
  }, [backendActor]);

  async function fetchData() {
    try {
      const notes = await backendActor.getnotes();
      console.log("Отримано з бекенду:", notes);
      setNotesList(notes);
    } catch (error) {
      console.error("Помилка fetchData:", error);
    }
  }

  async function addNote(event) {
    event.preventDefault();
    if (!backendActor) return;

    try {
      await backendActor.addnote(note.title, note.content);
      await fetchData();
      setNote({ title: "", content: "" });
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