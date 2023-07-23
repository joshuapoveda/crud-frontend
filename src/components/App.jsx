import "../App.css";
import Notes from "./Notes";
import CreateForm from "./CreateForm";
import UpdateForm from "./UpdateForm";
import { useEffect } from "react";
import noteStore from "../stores/notesStore";
function App() {
  const store = noteStore();
  useEffect(() => {
    store.fetchNotes();
  }, []);
  return (
    <div>
      <Notes></Notes>
      <CreateForm></CreateForm>
      <UpdateForm></UpdateForm>
    </div>
  );
}

export default App;

// original state & functions:
//NOTE: THERE MAY BE INCONSISTENCIES WITH NAMING CONVENTIONS, DOUBLE CHECK
////STATE
// const [notes, setNotes] = useState(null);
// const [updateForm, setFormInput] = useState({
//   title: "",
//   body: "",
// });
// const [updateForm, setUpdateForm] = useState({
//   //to store the id of the note we are editing
//   _id: null,
//   title: "",
//   body: "",
// });

////FUNCTIONS
////get all
// const fetchNotes = async () => {
//   const res = await axios.get("http://localhost:3000/notes");
//   setNotes(res.data.notes);
// };

////update form for create
// const updateForm = (e) => {
//   const { name, value } = e.target;
//   console.log({ name, value });
//   //[ ] sets the name property to whatever the name value is on the form
//   setFormInput({ ...updateForm, [name]: value });
// };

////create
// const createNote = async (e) => {
//   e.preventDefault();
//   const res = await axios.post("http://localhost:3000/note", updateForm);
//   console.log(res);
//   setNotes([...notes, res.data.note]);

//   //clear form state
//   setFormInput({ title: "", body: "" });
// };

// //update form for update
// const handleUInputFieldChange = (e) => {
//   const { name, value } = e.target;
//   console.log({ name: value });
//   setUpdateForm({ ...updateForm, [name]: value });
// };

// //toggle the update form functionality
// //also sets form state to show unedited note data
// const toggleUpdate = (note) => {
//   console.log(note);
//   setUpdateForm({ title: note.title, body: note.body, _id: note._id });
// };

// //update
// const updateNote = async (e) => {
//   e.preventDefault();
//   const { title, body, _id } = updateForm;
//   const res = await axios.put(`http://localhost:3000/notes/${_id}`, {
//     title,
//     body,
//   });
//   const newNoteSet = [...notes];
//   const noteIndex = notes.findIndex((note) => {
//     return note._id === _id;
//   });
//   console.log(noteIndex);
//   newNoteSet[noteIndex] = res.data.note;
//   console.log(res.data.note);
//   setNotes(newNoteSet);
//   setUpdateForm({ _id: null, title: "", body: "" });
// };

// //toggle public value (update)
// const makePublic = async (note) => {
//   const { _id, eng } = note;
//   const res = await axios.put(`http://localhost:3000/notes/${_id}`, {
//     eng: !eng,
//   });
//   console.log(res.data);
//   const updatedNote = res.data.note;
//   const newNoteSet = notes.map((note) =>
//     note._id === _id ? updatedNote : note
//   );
//   console.log(newNoteSet);
//   setNotes(newNoteSet);
// };

// //delete
// const deleteNote = async (_id) => {
//   const res = await axios.delete(`http://localhost:3000/notes/${_id}`);
//   console.log(res);
//   const updatedNoteSet = [...notes].filter((note) => {
//     return note._id !== _id;
//   });
//   setNotes(updatedNoteSet);
// };
