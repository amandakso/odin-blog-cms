import "./App.css";

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import Home from "./components/Home";
import Create from "./components/Create";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute child={<Home />} />} />
          <Route path="/create" element={<PrivateRoute child={<Create />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
