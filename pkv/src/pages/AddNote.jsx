import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NotesContext } from "../context/NotesContext";
import "../styles/addNote.css";

export default function AddNote() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addNote, updateNote } = useContext(NotesContext);

  // ✅ If editing: note comes from Notes page
  const editingNote = location.state || null;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Fill data when editing
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title || "");
      setContent(editingNote.content || "");
      setFavorite(editingNote.favorite || false);
    }
  }, [editingNote]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty");
      return;
    }

    setLoading(true);

    try {
      if (editingNote) {
        // ✅ UPDATE EXISTING NOTE
        await updateNote({
          id: editingNote.id,
          title,
          content,
          favorite,
        });
        alert("Note updated ✅");
      } else {
        // ✅ CREATE NEW NOTE
        await addNote({
          title,
          content,
          favorite: false, // new note is not favorite by default
        });
        alert("Note added ✅");
      }

      navigate("/notes");
    } catch (err) {
      alert("Failed to save note ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addnote-container">
      <div className="addnote-card">
        <h2>{editingNote ? "✏️ Edit Note" : "➕ Add New Note"}</h2>

        <input
          className="addnote-input"
          type="text"
          placeholder="Enter note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="addnote-textarea"
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <div className="addnote-actions">
          <button
            className="btn-secondary"
            onClick={() => navigate("/notes")}
          >
            Cancel
          </button>

          <button
            className="btn-primary"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : editingNote ? "Update Note" : "Save Note"}
          </button>
        </div>
      </div>
    </div>
  );
}
