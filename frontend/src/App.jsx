import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import Login from "./pages/Login.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { useAuthStore } from "./store/useAuthStore.js";

const App = () => {
  const {authUser, checkAuth} = useAuthStore()

  useEffect()
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};
export default App;
