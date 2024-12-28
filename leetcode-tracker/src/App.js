import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Problem from "./components/Problem";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problem/:id" element={<Problem />} />
      </Routes>
    </Router>
  );
}

export default App;
