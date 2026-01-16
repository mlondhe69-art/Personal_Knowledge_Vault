import { useNavigate } from "react-router-dom";
import NoteList from "../components/notes/NoteList";
import "../styles/notes.css";

export default function Notes() {
  const navigate = useNavigate();

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h2 className="notes-title">📝 My Notes</h2>

        <button
          className="add-note-btn"
          onClick={() => navigate("/add-note")}
        >
          ＋ Add Note
        </button>
      </div>

      <div className="notes-content">
        <NoteList />
      </div>
    </div>
  );
}
