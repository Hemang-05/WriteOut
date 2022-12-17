import React,{useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import usecontext from "../Context/Notes/NotesContext";
import AddNote from "./addNote";
import NotesItem from "./NotesItem";

const Notes = () => {
  const context = useContext(usecontext);
    const{notes,getNotes} = context;
 let navigate = useNavigate();
    useEffect(() => {
      if(localStorage.getItem('token')){
        getNotes();
      }
      else{
        navigate('/login')
      }
  }, [])


  return (
      <>
      <AddNote/>
    <div className="row">
      {notes.map((note) => {
        return <NotesItem key={note._id} note={note} />;
      })}
    </div>
    </>
  );
};

export default Notes;
