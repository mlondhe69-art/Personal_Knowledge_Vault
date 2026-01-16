import "./appLayout.css";
import Navbar from "../components/common/Navbar";

export default function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <Navbar />
      {children}
    </div>
  );
}
