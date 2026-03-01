import { useEffect, useState } from 'react';
// Зверни увагу: ми імпортуємо ФАБРИКУ та ID, а не готовий об'єкт
import { createActor, canisterId } from '../../declarations/dkeeper_backend';
import { HttpAgent } from "@dfinity/agent";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";

function App() {
  const [note, setNote] = useState({ title: "", content: "" });
  const [notesList, setNotesList] = useState([]);
  
  // Створюємо стан для нашого бекенду
  const [backendActor, setBackendActor] = useState(null);

  // 1. Ініціалізуємо підключення ПРАВИЛЬНО
  useEffect(() => {
      async function initAgent() {
        try {
          // 1. Створюємо агента новим асинхронним методом (через await)
          const agent = await HttpAgent.create({ host: "http://localhost:4943" });

          // 2. Обов'язково отримуємо ключі для локальної мережі
          await agent.fetchRootKey();

          // 3. Створюємо актора та зберігаємо в стейт
          const actor = createActor(canisterId, { agent });
          setBackendActor(actor);
        } catch (error) {
          console.error("Помилка ініціалізації агента:", error);
        }
      }
      initAgent();
    }, []);

  // 2. Викликаємо fetchData ТІЛЬКИ коли бекенд повністю готовий
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
    if (!backendActor) return; // Захист від подвійних кліків

    try {
      await backendActor.addnote(note.title, note.content);
      await fetchData();
      setNote({ title: "", content: "" });
    } catch (error) {
      console.error("Помилка при додаванні:", error);
    }
  }

  function deleteNote(id) {
    // Поки що видаляємо тільки локально, потім додамо видалення з блокчейну
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