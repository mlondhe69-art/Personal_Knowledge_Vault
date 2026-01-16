import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const isFirstLogin = true; // later replace with backend flag

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">

      {/* ================= WELCOME ================= */}
      <div className="welcome-section">
        <h1>👋 Welcome to your Personal Knowledge Vault</h1>
        <p>Your private, encrypted space to store notes securely.</p>

        {isFirstLogin && (
          <div className="info-banner">
            🔐 Your data is end-to-end encrypted.
            Start by creating your first note.
          </div>
        )}
      </div>

      {/* ================= CARDS ================= */}
      <div className="card-grid">
        {/* HERO CARD */}
        <div
          className="card hero-card"
          onClick={() => navigate("/notes")}
        >
          <h2>📝 My Notes</h2>
          <p>Create, edit and organize notes securely.</p>
          <button
            className="primary-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/notes");
            }}
          >
            + Create Your First Note
          </button>
        </div>

        <div
          className="card"
          onClick={() => navigate("/favorites")}
        >
          <h2>⭐ Favorites</h2>
          <p>You haven’t starred any notes yet.</p>
          <span className="muted-text">
            Star notes to find them quickly.
          </span>
        </div>

        <div
          className="card"
          onClick={() => navigate("/secure")}
        >
          <h2>🔒 Secure Storage</h2>
          <p>Protect sensitive notes with a vault password.</p>
          <button
            className="secondary-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/secure");
            }}
          >
            Enable Secure Storage
          </button>
        </div>
      </div>
    </div>
  );
}
