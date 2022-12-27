import React from "react";
import HalUtama from "./components/Main";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Login from "./components/Login";
import Register from "./components/Regist";
import PrivateRoutes from "./components/PrivateRoutes";
import PublicRoutes from "./components/PublicRoutes";
import AdminRoutes from "./components/AdminRoutes";
import Cart from "./components/Cart";
import History from "./components/History";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<HalUtama />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/history" element={<History />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
