import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/favorites.css";

export default function Favorites() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:8080/api/notes/favorites", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Unauthorized");
      }

      const data = await res.json();
      setNotes(data);
    } catch (err) {
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/notes/${id}/favorite`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      fetchFavorites();
    } catch {
      alert("Failed to update favorite");
    }
  };

  const deleteNote = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:8080/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      fetchFavorites();
    } catch {
      alert("Failed to delete note");
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <div>
          <h2 className="favorites-title">⭐ Favorite Notes</h2>
          <p className="favorites-subtitle">
            Your saved notes that you marked as favorites.
          </p>
        </div>

        <button className="back-notes-btn" onClick={() => navigate("/notes")}>
          ← Back to Notes
        </button>
      </div>

      {loading ? (
        <div className="favorites-loading">Loading favorites...</div>
      ) : notes.length === 0 ? (
        <div className="favorites-empty">
          <h3>No favorite notes yet 😅</h3>
          <p>Go to Notes and click ☆ Favorite to save your best notes here.</p>

          <button className="go-notes-btn" onClick={() => navigate("/notes")}>
            Go to Notes
          </button>
        </div>
      ) : (
        <div className="favorites-grid">
          {notes.map((note) => (
            <div className="fav-card" key={note.id}>
              <div className="fav-top">
                <h3 className="fav-title">{note.title}</h3>
                <span className="fav-badge">FAVORITE</span>
              </div>

              <p className="fav-content">{note.content}</p>

              <div className="fav-actions">
                <button
                  className="fav-btn"
                  onClick={() => toggleFavorite(note.id)}
                >
                  ⭐ Unfavorite
                </button>

                <button
                  className="fav-btn edit"
                  onClick={() => navigate("/add-note", { state: note })}
                >
                  Edit
                </button>

                <button
                  className="fav-btn delete"
                  onClick={() => deleteNote(note.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
