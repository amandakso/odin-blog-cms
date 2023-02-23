import "./App.css";

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import Home from "./components/Home";
import Create from "./components/Create";
import Edit from "./components/Edit";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/odin-blog-cms/"
            element={<PrivateRoute child={<Home />} />}
          />
          <Route
            path="/odin-blog-cms/create"
            element={<PrivateRoute child={<Create />} />}
          />
          <Route
            path="/odin-blog-cms/edit/:postid"
            element={<PrivateRoute child={<Edit />} />}
          />
          <Route path="/odin-blog-cms/login" element={<Login />} />
          <Route path="/odin-blog-cms/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
