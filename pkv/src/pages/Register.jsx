import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/register.css";

export default function Register() {
  const navigate = useNavigate();

  // ✅ States for inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Show message if redirected from backend
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const msg = params.get("msg");
    if (msg) alert(msg);
  }, []);

  // ✅ Google Register (state=REGISTER)
  const handleGoogleRegister = () => {
    window.location.href =
      "http://localhost:8080/oauth2/authorization/google?state=REGISTER";
  };

  // ✅ Email Register
  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) throw new Error("Registration failed");

      alert("Registered successfully ✅");
      navigate("/login");
    } catch (err) {
      alert("Email already exists ❌");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account 🚀</h2>

        {/* ✅ OAuth Register Button */}
        <button className="google-btn" onClick={handleGoogleRegister}>
          Sign up with Google
        </button>

        <div className="divider">OR</div>

        {/* ✅ Email Register Inputs */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>Register</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
