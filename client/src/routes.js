import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "./components/pages/to_auth/Login";
import Register from "./components/pages/to_auth/Register";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<h1>Homepage</h1>} exact path="/" />
        <Route element={<Login />} path="login" />
        <Route element={<Register />} path="register" />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
