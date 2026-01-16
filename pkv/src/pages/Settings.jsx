import { useContext } from "react";
import Navbar from "../components/common/Navbar";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/settings.css";

export default function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <Navbar />

      <div className="settings-container">
        <div className="settings-card">
          <h2>⚙️ Settings</h2>
          <p className="settings-subtitle">
            Manage your account preferences
          </p>

          {/* Appearance */}
          <div className="settings-section">
            <h4>🎨 Appearance</h4>
            <div className="setting-row">
              <span>Theme</span>
              <button className="btn-primary" onClick={toggleTheme}>
                Switch to {theme === "light" ? "Dark" : "Light"} Mode
              </button>
            </div>
          </div>

          {/* Security */}
          <div className="settings-section">
            <h4>🔐 Security</h4>
            <div className="setting-row">
              <span>Change Password</span>
              <button className="btn-outline">Update</button>
            </div>

            <div className="setting-row">
              <span>Two-Factor Authentication</span>
              <button className="btn-outline">Enable</button>
            </div>
          </div>

          {/* Account */}
          <div className="settings-section">
            <h4>👤 Account</h4>
            <div className="setting-row danger">
              <span>Delete Account</span>
              <button className="btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
