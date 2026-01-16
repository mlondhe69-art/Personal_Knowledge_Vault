import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/forgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendLink = async () => {
    if (!email) {
      alert("Enter your email");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8080/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed to send reset link");

      alert("Reset link sent ✅ Check your email");
      navigate("/login");
    } catch (err) {
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fp-container">
      <div className="fp-card">
        <h2>Forgot Password 🔐</h2>
        <p>Enter your email and we will send you a reset link.</p>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleSendLink} disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <button className="fp-back" onClick={() => navigate("/login")}>
          Back to Login
        </button>
      </div>
    </div>
  );
}
