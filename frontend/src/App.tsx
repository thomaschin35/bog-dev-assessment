/**
 * This is the main file for the frontend. 
 * It contains the routes for the admin and viewer pages.
 */
import "./App.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NotesPage from "./NotesPage";
import LandingPage from "./LandingPage";

interface User {
  name: string;
  avatar: string;
  hero_project: string;
  notes: string;
  email: string;
  phone: string;
  rating: string;
  status: boolean;
  id: string;
}

function App() {
  const [rows, setRows] = useState<User[]>([]);
  // fetch the data from the backend
  useEffect(() => {
    fetch("http://localhost:4000/api/bog/users")
      .then((response) => response.json())
      .then((data) => setRows(data));
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<LandingPage role="admin" />} />
        <Route path="/viewer" element={<LandingPage role="viewer" />} />
        <Route path="/notes/:id" element={<NotesPage rows={rows} />} />
        <Route path="/" element={<Navigate to="/admin" />} />
      </Routes>
    </Router>
  );
}

export default App;
