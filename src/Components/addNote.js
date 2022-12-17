import React,{useState,useContext} from "react";
import usecontext from "../Context/Notes/NotesContext"; 

const AddNote = () => {
    const context = useContext(usecontext);
        const [note, setNote] = useState({title:"", description:"",tag:"default"})
   
   
        const handleclick=(e)=>{
            e.preventDefault();
            //console.log(note._id);
        context.addNote(note.title , note.description , note.tag , note.id );
        setNote({title:"", description:"",tag:""});
    }

    const onchange=(e)=>{
            setNote({...note,[e.target.name]: e.target.value})
    }
  return (
    <div>
      <div className="my-3">
        <h2>Add Note</h2>
      </div>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            aria-describedby="emailHelp"
            onChange={onchange}
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Descrpition
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onchange}
          />
        </div>
       
        <button type="submit" className="btn btn-primary" onClick={handleclick}>
         ADD
        </button>
      </form>

      <div className="my-3">
        <h2>Your Note</h2>
        {/* {context.notes.map((note)=>{
          return note.title;
      })} */}
      </div>
    </div>
  );
};

export default AddNote;
