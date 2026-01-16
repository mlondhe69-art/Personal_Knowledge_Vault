import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import AddNote from "./pages/AddNote";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import SecureStorage from "./pages/SecureStorage";
import ProtectedRoute from "./routes/ProtectedRoute";
import OAuthSuccess from "./pages/OAuthSuccess";
import Favorites from "./pages/Favorites";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/oauth-success" element={<OAuthSuccess />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />


      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Notes list */}
      <Route
        path="/notes"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Notes />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Add note page */}
      <Route
        path="/add-note"
        element={
          <AppLayout>
            <AddNote />
          </AppLayout>
        }
      />

      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Favorites />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Profile */}
      <Route
        path="/profile"
        element={
          <AppLayout>
            <Profile />
          </AppLayout>
        }
      />

      {/* Settings */}
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* Secure Storage */}
      <Route
        path="/secure"
        element={
          <ProtectedRoute>
            <SecureStorage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
