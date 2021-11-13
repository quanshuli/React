import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import noteReducer from "./reducers/noteReducer";
import { createNote, toggleImportanceOf } from "./reducers/noteReducer";
import { useSelector, useDispatch } from "react-redux";
import NewNote from "./services/NewNotes";
import Notes from "./services/Notes";
const App = () => {
  /*
  const dispatch = useDispatch();
  const notes = useSelector((state) => state);
  // {store.getState().map((note) => (
  // change to {notes.map(note =>

  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    //store.dispatch(createNote(content));
    dispatch(createNote(content));
  };

  const toggleImportance = (id) => {
    //store.dispatch(toggleImportanceOf(id));
    dispatch(toggleImportanceOf(id));
  };
*/

  return (
    <div>
      <NewNote />
      <Notes />
    </div>
  );
};

export default App;

/*
const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
*/

/*
When the state in the store is changed, React is not able to automatically 
rerender the application. Thus we have registered a function renderApp, which 
renders the whole app, to listen for changes in the store with the store.subscribe 
method. Note that we have to immediately call the renderApp method. 
Without the call the first rendering of the app would never happen.
*/
