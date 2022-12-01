import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
//pages
import Home from "./pages/Home/index";
import Login from "./pages/Login/index";
import Register from "./pages/Register/index";
import Profile from "./pages/Profile/index";
//themeContext
import { ThemeContext } from "./Hooks/ThemeContext.jsx";
//redux
import { useSelector } from "react-redux";
//css

function App() {
  const [theme] = useState({
    normalDark: "#242526",
    // dark: "#0A0A0A"
    dark: "#1c1e21",
    light: "white",
    normalLight: "#f0f2f5",
    mainColor: "#33DDFB",
  });
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);

  return (
    <div
      className="App"
      style={{
        minHeight: "100vh",
        backgroundColor: mode === "light" ? theme.normalLight : theme.dark,
      }}
    >
      <ThemeContext.Provider value={theme}>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={user ? <Navigate to="/home" replace /> : <Login />}
            />
            <Route
              path="/register"
              element={user ? <Navigate to="/home" replace /> : <Register />}
            />
            <Route
              path="/home"
              element={user ? <Home /> : <Navigate to="/" replace />}
            />
            <Route
              path="/profile/:userId"
              element={user ? <Profile /> : <Navigate to="/" replace />}
            />
          </Routes>
        </Router>
      </ThemeContext.Provider>
    </div>
  );
}
export default App;
