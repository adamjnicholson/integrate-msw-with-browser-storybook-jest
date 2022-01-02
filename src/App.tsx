import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./routes/";

function App() {
  return (
    <main>
      <h1>Student Reports</h1>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
  );
}

export default App;
