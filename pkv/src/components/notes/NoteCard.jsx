import "../../styles/noteCard.css";

export default function NoteCard({ title, content, createdAt }) {
  return (
    <div className="note-card">
      <h3 className="note-title">{title}</h3>

      <p className="note-content">{content}</p>

      <div className="note-footer">
        <span className="note-date">{createdAt}</span>
      </div>
    </div>
  );
}
