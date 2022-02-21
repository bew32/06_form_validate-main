import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import AddProduct from "./pages/AddProduct.js";
import EditProduct from "./pages/EditProduct.js";
import ErrorPage from "./pages/ErrorPage.js";
import Menu from "./components/Menu.js";


function App() {
  return (
    <Router>{/* โชว์ทุกหน้า */}
      <Menu />
      <Routes>
        {/* Content  */}
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="*" element={<ErrorPage />} />

      </Routes>
    </Router>
  );
}

export default App;
