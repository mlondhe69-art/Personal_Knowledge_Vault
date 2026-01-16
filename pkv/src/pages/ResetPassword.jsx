import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/forgotPassword.css"; // reuse same style

export default function ResetPassword() {
  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!token) {
      alert("Invalid reset link ❌");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8080/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          newPassword,
        }),
      });

      if (!res.ok) throw new Error("Reset failed");

      alert("Password reset successful ✅");
      navigate("/login");
    } catch (err) {
      alert(err.message || "Reset failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fp-container">
      <div className="fp-card">
        <h2>Reset Password 🔑</h2>
        <p>Enter your new password below.</p>

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button onClick={handleReset} disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        <button className="fp-back" onClick={() => navigate("/login")}>
          Back to Login
        </button>
      </div>
    </div>
  );
}
