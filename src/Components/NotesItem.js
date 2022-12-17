import React,{useContext} from "react";
import usecontext from "../Context/Notes/NotesContext";

const NotesItem = (props) => {
    const context = useContext(usecontext);
    //const {note} = props;
  return (
    <div className="col-md-3">
        
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{props.note.title}</h5>
          <p className="card-text">{props.note.description}</p>
          <i className="fa-solid fa-trash " onClick={()=>{context.deleteNote(props.note._id)}}></i>
          <i className="fa-solid fa-pen-nib mx-3"></i>
        </div>
      </div>
    </div>
  );
};

export default NotesItem;
