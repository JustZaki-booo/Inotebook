import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "https://inotebook-backend-i56l.onrender.com";
  const [notes, setNotes] = useState([]);

  // Get all notes from the server
  const getNotes = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No auth token found");
      setNotes([]);
      return;
    }

    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch notes:", response.status);
        setNotes([]);
        return;
      }

      const json = await response.json();
      setNotes(json || []);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
    }
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        console.error("Add note failed:", await response.text());
        return;
      }

      const newNote = await response.json();
      setNotes(notes.concat(newNote));
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete a note
  const deleteNote = async (_id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        console.error("Delete note failed:", await response.text());
        return;
      }

      setNotes(notes.filter((note) => note._id !== _id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        console.error("Edit note failed:", await response.text());
        return;
      }

      // Update local notes array
      setNotes(notes.map((note) => 
        note._id === id ? { ...note, title, description, tag } : note
      ));
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
