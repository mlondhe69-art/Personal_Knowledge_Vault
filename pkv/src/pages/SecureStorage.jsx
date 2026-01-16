import { useState } from "react";
import { generateKey, encrypt, decrypt } from "../utils/crypto";
import "../styles/secureStorage.css";

export default function SecureStorage() {
  const [password, setPassword] = useState("");
  const [vaultKey, setVaultKey] = useState(null);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const vaultExists = localStorage.getItem("vaultKey");

  const createVault = () => {
    if (password.length < 4) {
      alert("Password must be at least 4 characters");
      return;
    }

    const key = generateKey(password);
    localStorage.setItem("vaultKey", key);
    setVaultKey(key);
    setPassword("");
  };

  const unlockVault = () => {
    const savedKey = localStorage.getItem("vaultKey");
    const enteredKey = generateKey(password);

    if (savedKey !== enteredKey) {
      alert("Incorrect Vault Password");
      return;
    }

    setVaultKey(enteredKey);
    setPassword("");

    const encryptedNotes =
      JSON.parse(localStorage.getItem("secureNotes")) || [];

    const decryptedNotes = encryptedNotes.map((n) =>
      decrypt(n, enteredKey)
    );

    setNotes(decryptedNotes);
  };

  const saveNote = () => {
    if (!note.trim()) return;

    const encryptedNote = encrypt(note, vaultKey);

    const stored =
      JSON.parse(localStorage.getItem("secureNotes")) || [];

    localStorage.setItem(
      "secureNotes",
      JSON.stringify([...stored, encryptedNote])
    );

    setNotes([...notes, note]);
    setNote("");
  };

  return (
    <div className="secure-page">
      <h1>🔒 Secure Storage</h1>
      <p className="subtitle">
        Store private notes protected by a vault password.
      </p>

      {!vaultKey && (
        <div className="vault-box">
          <input
            type="password"
            placeholder="Vault Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!vaultExists ? (
            <button onClick={createVault}>
              Create Vault
            </button>
          ) : (
            <button onClick={unlockVault}>
              Unlock Vault
            </button>
          )}
        </div>
      )}

      {vaultKey && (
        <div className="notes-section">
          <textarea
            placeholder="Write a secure note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <button onClick={saveNote}>
            Save Secure Note
          </button>

          <ul className="notes-list">
            {notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
