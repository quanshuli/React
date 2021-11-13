import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_NOTE":
      // state.push(action.data); // change original data, bad
      return state.concat(action.data); // or [...state, action.data]

    case "TOGGLE_IMPORTANCE": {
      const id = action.data.id;
      const noteToChange = state.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((note) => (note.id !== id ? note : changedNote));
    }
    default:
      return state;
  }
};

const store = createStore(
  noteReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.dispatch({
  type: "NEW_NOTE",
  data: {
    content: "the app state is in redux store",
    important: true,
    id: 1,
  },
});

store.dispatch({
  type: "NEW_NOTE",
  data: {
    content: "state changes are made with actions",
    important: false,
    id: 2,
  },
});

const generateId = () => Math.floor(Math.random() * 1000000);

const createNote = (content) => {
  return {
    type: "NEW_NOTE",
    data: {
      content,
      important: false,
      id: generateId(),
    },
  };
};

const toggleImportanceOf = (id) => {
  return {
    type: "TOGGLE_IMPORTANCE",
    data: { id },
  };
};

const App = () => {
  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    store.dispatch(createNote(content));
  };
  const toggleImportance = (id) => {
    store.dispatch(toggleImportanceOf(id));
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      <ul>
        {store.getState().map((note) => (
          <li key={note.id} onClick={() => toggleImportance(note.id)}>
            {note.content}

            <strong>{note.important ? <button> IMPORTANT</button> : ""}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);

/*
When the state in the store is changed, React is not able to automatically 
rerender the application. Thus we have registered a function renderApp, which 
renders the whole app, to listen for changes in the store with the store.subscribe 
method. Note that we have to immediately call the renderApp method. 
Without the call the first rendering of the app would never happen.
*/
