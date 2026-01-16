export default function StatsCard({ title, value }) {
  return (
    <div style={{
      padding: "15px",
      border: "1px solid #ccc",
      marginTop: "10px",
      width: "200px"
    }}>
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}
