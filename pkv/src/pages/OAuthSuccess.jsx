import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // ✅ token comes encoded from backend
    const token = params.get("token");

    console.log("✅ OAuthSuccess Page Token:", token);

    if (token && token.length > 20) {
      sessionStorage.setItem("token", token);
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Logging you in...</h2>
    </div>
  );
}
