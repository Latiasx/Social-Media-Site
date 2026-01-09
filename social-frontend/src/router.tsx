import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppShell } from "./ui/AppShell";
import { FeedPage } from "./views/FeedPage";
import { LoginPage } from "./views/LoginPage";
import { RegisterPage } from "./views/RegisterPage";
import { RequireAuth } from "./ui/RequireAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/feed" replace /> },
      {
        path: "feed",
        element: (
          <RequireAuth>
            <FeedPage />
          </RequireAuth>
        ),
      },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  { path: "*", element: <Navigate to="/feed" replace /> },
]);
