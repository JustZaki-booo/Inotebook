import NoteContext from "../context/notes/NoteContext";
import { useContext } from "react";
function Noteitem(props) {

  // Destructure the note prop to access its properties
const {note, updateNote} = props;
const { deleteNote } = useContext(NoteContext); 

  return (
    <div className="col-md-3">

    <div className="card my-2">
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <i className="fa-solid fa-trash-arrow-up mx-2"onClick={()=>{deleteNote(note._id);
      props.showAlert("Note has been deleted", "success")
    }}></i>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=> {updateNote(note);}}></i>
  </div>
</div>
    </div>
  )
}

export default Noteitem;