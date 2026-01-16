import { useState } from "react";
import "../styles/secureStorage.css";

export default function PasswordModal({ onConfirm, firstTime }) {
  const [password, setPassword] = useState("");

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>
          {firstTime ? "Create Vault Password" : "Enter Vault Password"}
        </h3>

        <input
          type="password"
          placeholder="Vault Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={() => {
            if (password.length < 4) {
              alert("Password must be at least 4 characters");
              return;
            }
            onConfirm(password);
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
