import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
