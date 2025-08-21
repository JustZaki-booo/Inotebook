import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "https://inotebook-backend-i56l.onrender.com";
  const [notes, setNotes] = useState([]);

  // GET all notes
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

  // ADD note
  const addNote = async (title, description, tag) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        console.error("Add note failed:", await response.text());
        return;
      }

      const newNote = await response.json();
      setNotes([...notes, newNote]); // add to state
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // DELETE note
  const deleteNote = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        console.error("Delete note failed:", await response.text());
        return;
      }

      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // EDIT note
  const editNote = async (id, title, description, tag) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        console.error("Edit note failed:", await response.text());
        return;
      }

      setNotes(notes.map((note) =>
        note._id === id ? { ...note, title, description, tag } : note
      ));
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
