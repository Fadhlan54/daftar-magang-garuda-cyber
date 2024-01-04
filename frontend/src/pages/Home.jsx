import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./Home";
import Product from "./Product";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Pengalihan langsung dari root ke halaman produk */}
        <Route path="/" element={<Navigate to="/product" />} />

        {/* Rute halaman produk */}
        <Route path="/product" element={<Product />} />

        {/* Rute halaman home (opsional) */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
