import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleVote, newAnec } from "./reducers/anecdoteReducer";
import Anecdotes from "./components/AnecdoteForm";

const App = () => {
  const dispatch = useDispatch();
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anec.value;
    event.target.anec.value = "";
    dispatch(newAnec(content));
  };

  return (
    <div>
      <Anecdotes />
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anec" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
