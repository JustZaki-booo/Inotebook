import context from "../context/notes/NoteContext";
import { useContext, useState } from "react";

function AddNote(props) {
    const { addNote } = useContext(context);
    const [note, setNote] = useState({title : "", description : "", tag : ""})
    const handleClick = (e)=> {
        e.preventDefault(); // Prevent the default form submission
         addNote(note.title, note.description, note.tag);
          setNote({ title: "", description: "", tag: "" });
          props.showAlert("Note has been added", "success");
    }
    const onChange = (e) => {
        // Handle input changes here
setNote({...note, [e.target.name]: e.target.value});

    }
  return (
    <>
       <h1>Add a note</h1>
   
   <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp"onChange={onChange} minLength={3} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" value={note.description} name="description"onChange={onChange}minLength={5} required/>
  </div>
   <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" value={note.tag} name="tag"onChange={onChange}minLength={2} required/>
  </div>
  <button type="submit" disabled={note.title.length<3 || note.description.length<5 || note.tag.length<2} className="btn btn-primary my-2"onClick={handleClick}>Add Note</button>
</form>


  </>
  )
}

export default AddNote