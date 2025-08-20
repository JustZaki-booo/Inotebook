import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import "./App.css";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ import it

function App() {
  // ✅ Initialize state for alert
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container my-3">
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home showAlert={showAlert} />
                  </ProtectedRoute>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<Signup showAlert={showAlert} />} />

              {/* fallback route */}
              <Route
                path="*"
                element={
                  <ProtectedRoute>
                    <Home showAlert={showAlert} />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
