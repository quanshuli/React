import React from "react";
import NewNote from "./services/NewNotes";
import Notes from "./services/Notes";
import VisibilityFilter from "./components/VisibilityFilter";

const App = () => {
  const filterSelected = (value) => {
    console.log(value);
  };

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
