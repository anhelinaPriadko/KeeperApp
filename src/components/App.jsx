import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [notesList, setNotesList] = useState([]);

  function addNote(event) {
    setNotesList((prevState) => {
      return [...prevState, note];
    });
    setNote({
      title: "",
      content: "",
    });

    event.preventDefault();
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
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
