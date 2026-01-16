import { useContext } from "react";
import { NotesContext } from "../../context/NotesContext";
import { useNavigate } from "react-router-dom";
import EmptyNotes from "./EmptyNotes";

export default function NoteList() {
  const { notes, deleteNote, fetchNotes } = useContext(NotesContext);
  const navigate = useNavigate();

  // ✅ Toggle Favorite Function
  const toggleFavorite = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/notes/${id}/favorite`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      // ✅ refresh notes list
      fetchNotes();
    } catch (err) {
      alert("Failed to update favorite");
    }
  };

  return notes.length > 0 ? (
    <div className="notes-grid">
      {notes.map((note) => (
        <div className="note-card" key={note.id}>
          <h4>{note.title}</h4>
          <p>{note.content}</p>

          <div className="note-actions">
            {/* ✅ FAVORITE BUTTON */}
            <button className="note-btn" onClick={() => toggleFavorite(note.id)}>
              {note.favorite ? "⭐ Unfavorite" : "☆ Favorite"}
            </button>

            {/* ✅ EDIT */}
            <button
              className="note-btn"
              onClick={() => navigate("/add-note", { state: note })}
            >
              Edit
            </button>

            {/* ✅ DELETE */}
            <button className="note-btn delete" onClick={() => deleteNote(note.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <EmptyNotes />
  );
}
