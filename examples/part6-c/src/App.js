import React, { useEffect } from "react";
import NewNote from "./services/NewNotes";
import Notes from "./services/Notes";
import VisibilityFilter from "./components/VisibilityFilter";
import noteService from "./services/notes-axios-part6-c";
import { initializeNotes } from "./reducers/noteReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    noteService.getAll().then((notes) => dispatch(initializeNotes(notes)));
  }, []);

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
