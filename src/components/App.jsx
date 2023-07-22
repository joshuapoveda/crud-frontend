import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css"

function App() {
  const [notes, setNotes] = useState(null);
  const [formInput, setFormInput] = useState({
    title: "",
    body: "",
  });
  const [updateForm, setUpdateForm] = useState({
    //to store the id of the note we are editing
    _id: null,
    title: "",
    body: "",
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  //functions

  //get all
  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:3000/notes");
    setNotes(res.data.notes);
  };

  //update form for create
  const updateFormInput = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    //[ ] sets the name property to whatever the name value is on the form
    setFormInput({ ...formInput, [name]: value });
  };
  //create
  const createNote = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:3000/note", formInput);

    console.log(res);

    setNotes([...notes, res.data.note]);

    //clear form state
    setFormInput({ title: "", body: "" });
  };

  //update form for update
  const handleUpdateFieldChange = (e) => {
    const { name, value } = e.target;
    console.log({ name: value });
    setUpdateForm({ ...updateForm, [name]: value });
  };
  //toggle the update form functionality
  //also sets form state to show unedited note data
  const toggleUpdate = (note) => {
    console.log(note);
    setUpdateForm({ title: note.title, body: note.body, _id: note._id });
  };
  //update
  const updateNote = async (e) => {
    e.preventDefault();

    const { title, body, _id } = updateForm;

    const res = await axios.put(`http://localhost:3000/notes/${_id}`, {
      title,
      body,
    });

    const newNoteSet = [...notes];

    const noteIndex = notes.findIndex((note) => {
      return note._id === _id;
    });

    console.log(noteIndex);

    newNoteSet[noteIndex] = res.data.note;

    console.log(res.data.note);

    setNotes(newNoteSet);
    setUpdateForm({ _id: null, title: "", body: "" });
  };
  //toggle public value (update)
  const makePublic = async (note) => {
    const { _id, eng } = note;

    const res = await axios.put(`http://localhost:3000/notes/${_id}`, {
      eng: !eng,
    });

    console.log(res.data);

    const updatedNote = res.data.note;

    const newNoteSet = notes.map((note) =>
      note._id === _id ? updatedNote : note
    );
    console.log(newNoteSet)
    setNotes(newNoteSet);
  };

  //delete
  const deleteNote = async (_id) => {
    const res = await axios.delete(`http://localhost:3000/notes/${_id}`);
    console.log(res);

    const updatedNoteSet = [...notes].filter((note) => {
      return note._id !== _id;
    });
    setNotes(updatedNoteSet);
  };

  return (
    <div>
      <div className="border-4 border-pink-700">
        {notes &&
          notes.map((note) => {
            return (
              <div className="m-3 border-4 border-green-600" key={note._id}>
                <h3>{note.title}</h3>
                <p className="border-2 border-white">{note.body}</p>
                <p className="border-2 border-white">
                  {note.eng === true ? "true" : "false"}
                </p>
                {/* onclick needs a function to run function to avoid having it call itself upon page load */}
                <button
                  onClick={() => deleteNote(note._id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => toggleUpdate(note)}
                >
                  Update Note
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => makePublic(note)}
                >
                  Make public
                </button>
              </div>
            );
          })}
      </div>
      {!updateForm._id && (
        <div>
          <h2>Create Note</h2>
          <form onSubmit={createNote}>
            <input
              required
              onChange={updateFormInput}
              value={formInput.title}
              name="title"
            ></input>
            <textarea
              required
              onChange={updateFormInput}
              value={formInput.body}
              name="body"
            ></textarea>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              type="submit"
            >
              Create Note
            </button>
          </form>
        </div>
      )}
      {updateForm._id && (
        <div>
          <h2>Update Note</h2>
          <form onSubmit={updateNote}>
            <input
              onChange={handleUpdateFieldChange}
              value={updateForm.title}
              name="title"
            ></input>
            <textarea
              onChange={handleUpdateFieldChange}
              value={updateForm.body}
              name="body"
            ></textarea>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              type="submit"
            >
              Submit Edit Form
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
