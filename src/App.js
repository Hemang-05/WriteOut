import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./Context/Notes/NotesState";
import LoginPage from "./Components/LoginPage";
import SignUp from "./Components/SignUp";

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<LoginPage />}></Route>
              <Route exact path="/signup" element={<SignUp />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
