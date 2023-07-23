import noteStore from "../stores/notesStore";

const Note = ({ note }) => {

    const store = noteStore(store => {
        return {
            deleteNote: store.deleteNote,
            toggleUpdate: store.toggleUpdate,
            makePublic: store.makePublic
        }
    })

  return (
    <div>
      <div className="m-3 border-4 bg-cyan-500 border-green-600" key={note._id}>
        <h3>{note.title}</h3>
        <p className="border-2 border-white">{note.body}</p>
        <p className="border-2 border-white">
          {note.eng === true ? "true" : "false"}
        </p>
        {/* onclick needs a function to run function to avoid having it call itself upon page load */}
        <button
          onClick={() => store.deleteNote(note._id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Delete
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => store.toggleUpdate(note)}
        >
          Update Note
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => store.makePublic(note)}
        >
          Make public
        </button>
      </div>
    </div>
  );
};

export default Note;
