import { create } from "zustand";
import axios from "axios";

const noteStore = create((set) => ({
  notes: null,

  formInput: {
    title: "",
    body: "",
  },

  fetchNotes: async () => {
    const res = await axios.get("http://localhost:3000/notes");
    set({
      notes: res.data.notes,
    });
  },
  updateCreateFormInput: (e) => {
    const { name, value } = e.target;
    //[ ] sets the name property to whatever the name value is on the form

    //to use existing state
    set((state) => {
      //return the object we want to change
      return {
        formInput: {
          ...state.formInput,
          [name]: value,
        },
      };
    });
  },
  createNote: async (e) => {
    e.preventDefault();

    const { formInput, notes } = noteStore.getState();
    const res = await axios.post("http://localhost:3000/note", formInput);
    console.log(res);

    set({
      notes: [...notes, res.data.note],
      formInput: {
        title: "",
        body: "",
      },
    });
  },
  deleteNote: async (_id) => {
    const res = await axios.delete(`http://localhost:3000/notes/${_id}`);
    console.log(res);
    //we need the existing notes
    const { notes } = noteStore.getState();

    const newNoteSet = notes.filter((note) => {
      return note._id !== _id;
    });

    set({
      notes: newNoteSet,
    });
  },
}));

export default noteStore;
