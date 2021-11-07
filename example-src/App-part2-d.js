import React, { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";
import noteService from "./services/Notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    console.log("effect");
    // version 1 ./services/Notes.js
    //noteService.getAll().then((response) => {
    //  setNotes(response.data);
    //});
    // version 2
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  };

  useEffect(hook, []);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      data: new Date().toISOString(),
      important: Math.random() < 0.5,
      //id: notes.length + 1,
    };

    // version 1
    //noteService.create(noteObject).then((response) => {
    //  setNotes(notes.concat(response.data));
    //  setNewNote("");
    // version 2
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    /* If the promise is fulfilled, the first argument of then() will be called; 
      if the promise is rejected, the second argument will be called. */
    // version 1
    //noteService.update(id, changedNote).then((response) => {
    //  setNotes(notes.map((note) => (note.id !== id ? note : response.data)));
    // version 2
    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        alert(`the note '${note.content}' was already deleted from server`);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
