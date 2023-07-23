import noteStore from "../stores/notesStore";

import Note from "./Note";

const Notes = () => {
  const store = noteStore();

  return (
    <div className="border-4 border-pink-700">
      <h2>Notes</h2>
      {store.notes &&
        store.notes.map((note) => {
          return <Note note={note} key={note._id}></Note>;
        })}
    </div>
  );
};

export default Notes;
