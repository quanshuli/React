import React from "react";
import NewNote from "./services/NewNotes";
import Notes from "./services/Notes";

const App = () => {
  return (
    <div>
      <NewNote />
      <Notes />
    </div>
  );
};

export default App;
