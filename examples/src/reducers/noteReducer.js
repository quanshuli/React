import React from "react";
import noteService from "../services/notes-axios-part6-c";

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

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_NOTE":
      console.log("state", state);
      console.log("state.notes", state.notes);
      //console.log(state.notes.concat(action.data));
      // state.push(action.data); // change original data, bad
      return state.concat(action.data); // or [...state, action.data]
    //return { ...state, notes: state.notes.concat(action.data) };

    case "INIT_NOTES":
      return action.data;

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

const generateId = () => Math.floor(Math.random() * 1000000);

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content);
    dispatch({
      type: "NEW_NOTE",
      data: newNote,
    });
  };
};

export const toggleImportanceOf = (id) => {
  return {
    type: "TOGGLE_IMPORTANCE",
    data: { id },
  };
};

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch({
      type: "INIT_NOTES",
      data: notes,
    });
  };
};

export default noteReducer;
