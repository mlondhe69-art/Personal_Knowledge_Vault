import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/user/me", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(setUser)
      .catch(() => navigate("/login"));
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* HEADER */}
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div className="profile-basic">
            <h2>{user.name}</h2>
            <p className="profile-email">{user.email}</p>

            <span className="profile-badge">
              {user.provider === "GOOGLE" && "Google Account"}
              {user.provider === "FACEBOOK" && "Facebook Account"}
              {user.provider === "LOCAL" && "Standard Account"}
            </span>
          </div>
        </div>

        {/* INFO */}
        <div className="profile-info">
          <div className="info-row">
            <span>📅 Joined</span>
            <span>
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="info-row">
            <span>🔐 Login Method</span>
            <span>{user.provider}</span>
          </div>

          <div className="info-row">
            <span>🛡 Security</span>
            <span className="status-secure">Secure</span>
          </div>
        </div>

        {/* LOGOUT */}
        <div className="profile-actions single">
          <button className="btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
