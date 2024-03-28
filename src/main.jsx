import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import MainTemplate from "./components/main-template/main-template.component";
import Home from "./pages/home/home.component";
import store from "./redux/store";
import FilmDetail from "./pages/film-detail/film-detail.component";
import PageNotFound from "./pages/not-found/not-found.component";

import "./index.css";
const router = createBrowserRouter([
    {
        path: "/",
        element: <MainTemplate />,
        errorElement: <PageNotFound />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "lich-chieu",
                element: <p style={{ height: "100vh" }}>Lịch chiếu</p>,
            },
            {
                path: "/phim/chi-tiet/:id",
                element: <FilmDetail />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
    </Provider>
);