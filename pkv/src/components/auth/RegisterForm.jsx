import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px" }}>
      <h2>Register</h2>

      <input placeholder="Name" /><br /><br />
      <input placeholder="Email" /><br /><br />
      <input type="password" placeholder="Password" /><br /><br />

      <button onClick={() => navigate("/login")}>
        Register
      </button>
    </div>
  );
}
