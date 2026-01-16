import { createContext, useEffect, useState } from "react";

export const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);

  // ✅ Fetch all notes from backend (user-specific)
  const fetchNotes = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/notes", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Fetch notes error:", err);
      setNotes([]);
    }
  };

  // ✅ Load notes when app starts
  useEffect(() => {
    fetchNotes();
  }, []);

  // ✅ Add note in backend
  const addNote = async (note) => {
    try {
      const res = await fetch("http://localhost:8080/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(note),
      });

      if (!res.ok) throw new Error("Failed to add note");

      fetchNotes(); // refresh list
    } catch (err) {
      alert("Failed to add note");
      console.error(err);
    }
  };

  // ✅ Delete note in backend
  const deleteNote = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete note");

      fetchNotes(); // refresh list
    } catch (err) {
      alert("Failed to delete note");
      console.error(err);
    }
  };

  // ✅ Update note in backend
  const updateNote = async (updatedNote) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/notes/${updatedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedNote),
        }
      );

      if (!res.ok) throw new Error("Failed to update note");

      fetchNotes(); // refresh list
    } catch (err) {
      alert("Failed to update note");
      console.error(err);
    }
  };

  return (
    <NotesContext.Provider
      value={{ notes, fetchNotes, addNote, deleteNote, updateNote }}
    >
      {children}
    </NotesContext.Provider>
  );
}
