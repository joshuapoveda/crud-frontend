import { create } from "zustand";
import axios from "axios";

const noteStore = create((set) => ({
  notes: [],

  createFormFields: {
    title: "",
    body: "",
  },

  updateFormFields: {
    //to store the id of the note we are editing
    _id: null,
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
        createFormFields: {
          ...state.createFormFields,
          [name]: value,
        },
      };
    });
  },
  createNote: async (e) => {
    e.preventDefault();

    const { createFormFields, notes } = noteStore.getState();
    const res = await axios.post(
      "http://localhost:3000/note",
      createFormFields
    );

    set({
      notes: [...notes, res.data.note],
      createFormFields: {
        title: "",
        body: "",
      },
    });
  },
  deleteNote: async (_id) => {
    const res = await axios.delete(`http://localhost:3000/notes/${_id}`);
    //we need the existing notes
    const { notes } = noteStore.getState();
    console.log(res);
    const newNoteSet = notes.filter((note) => {
      return note._id !== _id;
    });

    set({
      notes: newNoteSet,
    });
  },
  updateUpdateFormInput: (e) => {
    //update form for update
    const { value, name } = e.target;

    set((state) => {
      return {
        updateFormFields: {
          ...state.updateFormFields,
          [name]: value,
        },
      };
    });
  },
  toggleUpdate: ({ _id, title, body }) => {
    set({
      updateFormFields: {
        _id,
        title,
        body,
      },
    });
  },
  updateNote: async (e) => {
    e.preventDefault();

    const {
      updateFormFields: { _id, title, body },
      notes,
    } = noteStore.getState();

    const res = await axios.put(`http://localhost:3000/notes/${_id}`, {
      title,
      body,
    });

    const newNoteSet = [...notes];
    const noteIndex = notes.findIndex((note) => {
      return note._id === _id;
    });
    newNoteSet[noteIndex] = res.data.note;

    set({
      notes: newNoteSet,
      updateFormFields: {
        _id: null,
        title: "",
        body: "",
      },
    });
  },
  makePublic: async (note) => {
    const { _id, eng } = note;
    const { notes } = noteStore.getState();

    const res = await axios.put(`http://localhost:3000/notes/${_id}`, {
      eng: !eng,
    });

    const newNoteSet = [...notes];
    const noteIndex = notes.findIndex((note) => {
      return note._id === _id;
    });
    newNoteSet[noteIndex] = res.data.note;

    set({
      notes: newNoteSet,
    });
  },
}));

export default noteStore;
