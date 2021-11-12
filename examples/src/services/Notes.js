import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

const Note = ({ note, handleClick }) => {
  /*
    Note, responsible for rendering a single note, is very simple, 
    and is not aware that the event handler it gets as props dispatches
    an action. These kinds of components are called presentational in 
    React terminology.
    */

  return (
    <li onClick={handleClick}>
      {note.content}
      <strong>
        {note.important ? <button>IMPORTANT</button> : <button>NORMAL</button>}
      </strong>
    </li>
  );
};

const Notes = () => {
  /*
    Notes, on the other hand, is a container component, as it contains 
    some application logic: it defines what the event handlers of the 
    Note components do and coordinates the configuration of presentational 
    components, that is, the Notes.
    */

  const dispatch = useDispatch();
  const notes = useSelector((state) => state);

  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => dispatch(toggleImportanceOf(note.id))}
        />
      ))}
    </ul>
  );
};

export default Notes;
