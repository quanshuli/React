import React from "react";

const initialState = {
  notes: [
    {
      content: "reducer defines how redux store works",
      important: true,
      id: 1,
    },
    {
      content: "state of store can contain any data",
      important: false,
      id: 2,
    },
  ],
  filter: "IMPORTANT",
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_NOTE":
      console.log("state", state);
      console.log("state.notes", state.notes);
      //console.log(state.notes.concat(action.data));
      // state.push(action.data); // change original data, bad
      // return state.notes.concat(action.data); // or [...state, action.data]
      return { ...state, notes: state.notes.concat(action.data) };

    case "TOGGLE_IMPORTANCE": {
      const id = action.data.id;
      const noteToChange = state.notes.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return {
        ...state,
        notes: state.notes.map((note) => (note.id !== id ? note : changedNote)),
      };
    }
    default:
      return state;
  }
};

const generateId = () => Math.floor(Math.random() * 1000000);

export const createNote = (content) => {
  return {
    type: "NEW_NOTE",
    data: {
      content,
      important: false,
      id: generateId(),
    },
  };
};

export const toggleImportanceOf = (id) => {
  return {
    type: "TOGGLE_IMPORTANCE",
    data: { id },
  };
};

export default noteReducer;
