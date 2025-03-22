import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./componets/Header"; // Fixed typo
import React, { useEffect, useState } from "react";
import Login from "./componets/Login"; // Fixed typo
import Blogs from "./componets/Blogs";
import UserBlogs from "./componets/UserBlogs";
import AddBlogs from "./componets/AddBlogs";
import BlogDetail from "./componets/BlogDetail";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} /> {/* ✅ Add Signup Route */}
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/myBlogs" element={<UserBlogs />} />
          <Route path="/myBlogs/:id" element={<BlogDetail />} />
          <Route path="/blogs/add" element={<AddBlogs />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
