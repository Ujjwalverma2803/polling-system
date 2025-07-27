import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import TeacherStartPage from "./components/TeacherStartPage";
import StudentStartPage from "./components/StudentStartPage";
import WaitingScreen from "./components/WaitingScreen";
import LivePolling from "./components/LivePollingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/teacher",
    element: <TeacherStartPage />,
  },
  {
    path: "/student",
    element: <StudentStartPage />,
  },
  {
    path: "/waiting",
    element: <WaitingScreen />,
  },
  {
    path: "/LivePolling",
    element: <LivePolling />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
