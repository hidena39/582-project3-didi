import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import UserList from "./components/UserList";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EachstorePage from "./pages/EachstorePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <UserList />
        <HomePage />
      </div>
    ),
  },
  {
    path: "/each-store/:storename",
    element: (
      <div>
        <UserList />
        <EachstorePage />
      </div>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
