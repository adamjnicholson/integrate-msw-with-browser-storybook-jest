import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./routes/";

function App() {
  return (
    <main className="bg-gray-50 p-8 flex flex-col min-h-screen">
      <h1 className="font-bold text-4xl text-gray-900 pb-8">Student Reports</h1>
      <section className="bg-gray-200 rounded-lg p-4 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;
