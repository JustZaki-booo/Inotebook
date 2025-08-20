import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
 const initialNotes = []
 const [notes, setNotes] = useState(initialNotes);

    // Add more state management functions as needed
    // For example, you can add functions to add, delete, or update notes
    //to get all notes from the server
    const getNotes = async () => {
        //TODO: API call to get a note

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'auth-token' : localStorage.getItem('token')
  }  
})
const json = await response.json();
setNotes(json);



    }

    // Example function to add a note
   const addNote = async (title, description, tag) => {
  // API call to add a note
  const response = await fetch(`${host}/api/notes/addnote`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token')
    },
    body: JSON.stringify({ title, description, tag })
  });

  if (!response.ok) {
    console.error("Add note failed:", await response.text());
    return;
  }

  const newNote = await response.json();
  setNotes(notes.concat(newNote));
  // If backend returns the created note, use it, otherwise fallback to local object
};
      const deleteNote = async (_id) => {

          //TODO: API call to add a note
        const response = await fetch(`${host}/api/notes/deletenote/${_id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    'auth-token' : localStorage.getItem('token')
  },
});
        const json = await response.json();
                   // Logic to delete a note
       const newNotes = notes.filter((note)=> {return note._id !== _id});
        setNotes(newNotes);

       
    }
      const editNote = async (id, title, description, tag) => {
        //TODO: API call to add a note

        const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'auth-token' : localStorage.getItem('token')
  },
  body: JSON.stringify({ title, description, tag })
});

const json = await response.json();

        //logic to edit a note//
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if (element._id === id){
            element.title = title;
            element.description = description;
            element.tag = tag;
            setNotes([...notes]);
          }
        }
    }
    return (
      <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
      </NoteContext.Provider>
    )
}

export default NoteState;

// NoteState will be used to wrap the application and provide notes context
// It can include state management for notes, such as adding, deleting, or updating notes
// Components within NoteState can access the notes data and functions provided by the context provider