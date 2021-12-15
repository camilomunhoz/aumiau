import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "./components/pages/to_auth/Login";
import Register from "./components/pages/to_auth/Register";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route component = { <Login /> } exact path="/" />
        <Route component = { <Login /> } path="/login" />
        <Route component = { <Register /> } path="/register" />
      </Routes>
    </BrowserRouter>
  );
}; 

export default AppRoutes;
