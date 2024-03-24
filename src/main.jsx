import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import MainTemplate from "./components/main-template/main-template.component";
import Home from "./pages/home/home.component";
import store from "./redux/store";

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
    <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
    </Provider>
);
