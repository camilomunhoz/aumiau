import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/routes/PrivateRoute";

// Pages and layouts
import Login from "./components/pages/public/Login";
import Register from "./components/pages/public/Register";
import Dashboard from "./components/layouts/Dashboard";
import Home from "./components/pages/private/Home";
import ManagePet from "./components/pages/private/ManagePet";
import ViewPet from "./components/pages/private/ViewPet";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<Login />} path="login" />
        <Route element={<Register />} path="register" />

        {/* Private routes that uses Dashboard layout (includes navbar) */}
        <Route element={<Dashboard />}>
          {/* Home */}
          <Route
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
            exact
            path="/"
          />
          {/* Add pet */}
          <Route
            element={
              <PrivateRoute>
                <ManagePet />
              </PrivateRoute>
            }
            path="pets/add"
          />
          {/* Edit pet */}
          <Route
            element={
              <PrivateRoute>
                <ManagePet />
              </PrivateRoute>
            }
            path="pets/edit/:id"
          />
          {/* View pet details */}
          <Route
            element={
              <PrivateRoute>
                <ViewPet />
              </PrivateRoute>
            }
            path="pets/:id"
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
