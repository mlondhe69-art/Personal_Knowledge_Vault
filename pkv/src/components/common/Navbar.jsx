import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  // ✅ Fetch current user
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:8080/api/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  const avatarLetter = user?.name
    ? user.name.charAt(0).toUpperCase()
    : "U";

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="navbar-left">
        <div className="brand" onClick={() => navigate("/dashboard")}>
          📚 <span>Personal Knowledge Vault</span>
        </div>

        <div className="nav-links">
          <NavLink to="/dashboard" className="nav-link">
            Dashboard
          </NavLink>

          <NavLink to="/notes" className="nav-link">
            Notes
          </NavLink>

          <NavLink to="/favorites" className="nav-link">
            Favorites
          </NavLink>

          <NavLink to="/profile" className="nav-link">
            Profile
          </NavLink>
        </div>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        <div className="profile-pill" onClick={() => navigate("/profile")}>
          <div className="avatar">{avatarLetter}</div>
          <span>{user?.name || "User"}</span>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
