import React from "react";
import Homepage from "./pages/Homepage.jsx";
import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage.jsx";
import NoteDetail from "./pages/NoteDetailPage.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div data-theme="light" className="relative h-full w-full">
      {/* Background Gradient Layer */}
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />

      {/* Toast Notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetail />} />
      </Routes>
    </div>
  );
};

export default App;
