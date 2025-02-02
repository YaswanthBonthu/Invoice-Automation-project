import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/" element={<Home setUser={setUser} />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Home setUser={setUser} />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
