import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { About } from "./components/About";
import Navbar from "./components/Navbar";
import { Contact } from "./components/Contact";
import { Card } from "./components/Card";
import CardClass from "./components/CardClass";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact/:id" element={<Card />} />
        <Route />
      </Routes>
    </>
  );
};

export default App;
