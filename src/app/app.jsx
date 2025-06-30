import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "../auth/register";
import HomePage from "../pages/home";
import LoginPage from "../auth/login";

const rute = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {rute.map((router) => (
          <Route path={router.path} element={router.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
