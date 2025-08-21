import { useContext, useEffect, useRef, useState } from "react";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import NoteContext from "../context/notes/NoteContext";

function Notes(props) {
  const { notes, getNotes, editNote } = useContext(NoteContext);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  // Only fetch notes if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) getNotes();
  }, [getNotes]);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag || "",
    });
  };

  const handleClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note has been updated", "success");
  };

  const onChange = (e) => setNote({ ...note, [e.target.name]: e.target.value });

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editModal">Open</button>

      <div className="modal fade" id="editModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form>
                <input type="text" name="etitle" value={note.etitle} onChange={onChange} minLength={3} required className="form-control my-2" placeholder="Title" />
                <input type="text" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required className="form-control my-2" placeholder="Description" />
                <input type="text" name="etag" value={note.etag} onChange={onChange} className="form-control my-2" placeholder="Tag" />
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleClick} type="button" disabled={note.etitle.length<3 || note.edescription.length<5} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <h1>Your Notes</h1>
      {(!notes || notes.length === 0) ? "No Notes to display" :
        notes.map(n => <Noteitem key={n._id} note={n} updateNote={updateNote} showAlert={props.showAlert} />)
      }
    </>
  );
}

export default Notes;
