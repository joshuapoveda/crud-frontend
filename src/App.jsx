import { useState, useEffect } from "react";
import axios from "axios"
import "./App.css";

function App() {
  const [notes, setNotes] = useState(null)

  useEffect(()=>{
    fetchNotes()
  },[])

  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:3000/notes")
    setNotes(res.data.notes)
  }
  console.log(notes)
  return (
    <div>
      <h1 className="text-3xl text-center">Hello</h1>
      <div className="border-4 border-pink-700 h-32">
        {notes && notes.map(note => {
          return(
          <div key={note._id}>
            <h3>{note.title}</h3>
          </div>)
        })}
      </div>
    </div>
  );
}

export default App;
