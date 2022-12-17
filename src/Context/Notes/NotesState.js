import NoteContext from "./NotesContext.js";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000/notes";

  const initialnote = [];

  const [notes, Setnotes] = useState(initialnote);

  //Fetch all Notes

  const getNotes = async () => {
    let response = await fetch(`${host}/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')      },
    });
    // const note_value =await response.json();
    // console.log(note_value);
    // Setnotes(note_value);
    response = await response.json();

    Setnotes(response);
  };

  //ADD note
  const addNote = async (title, description, tag, id) => {
    const response = await fetch("http://localhost:5000/notes/addnotes", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();

    Setnotes(notes.concat(note));
  };

  // Delete note

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')      },
    });
    // const note_value =await response.json();
    // console.log(note_value);
    // Setnotes(note_value);
    const json = await response.json();
    console.log(json);

    const newNote = notes.filter((note) => {
      console.log(note._id);
      return note._id !== id;
    });
    Setnotes(newNote);
    // console.log("Deleting the Note" + id);
  };

  //edit note
  const editNote = () => {};

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
