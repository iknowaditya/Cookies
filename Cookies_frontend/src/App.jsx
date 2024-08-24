import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { Toaster } from "react-hot-toast";
import Editor from "./Components/Editor";
import Admin from "./Components/Admin";
import Lounge from "./Components/Lounge";
import Home from "./Pages/Home";
import RequireAuth from "./Components/RequireAuth";
import Unauthorized from "./Components/Unaurthorized";
import LinkPage from "./Components/LinkPage";
import Header from "./Components/Header";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Unauthorized Route */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/lounge" element={<Lounge />} />
          <Route path="/linkpage" element={<LinkPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
