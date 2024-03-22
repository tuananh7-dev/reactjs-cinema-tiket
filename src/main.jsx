import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import MainTemplate from "./components/main-template/main-template.component";
import Home from "./pages/home/home.component";

import "./index.css";
const router = createBrowserRouter([
    {
        path: "/",
        element: <MainTemplate />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "lich-chieu",
                element: <p style={{ height: "100vh" }}>Lịch chiếu</p>,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router}>{/* <App /> */}</RouterProvider>
);
