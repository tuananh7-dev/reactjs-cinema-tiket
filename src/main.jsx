import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import MainTemplate from "./components/main-template/main-template.component";
import Home from "./pages/home/home.component";
import store from "./redux/store";
import FilmDetail from "./pages/film-detail/film-detail.component";
import PageNotFound from "./pages/not-found/not-found.component";
import LoginTemplate from "./components/login-template/login-template.component";
import Login from "./pages/login/login.component";
import Register from "./pages/register/register.component";
import PickTime from "./pages/pick-time/pick-time.component";
import PickSeat from "./pages/pick-seat/pick-seat.component";
import Payment from "./pages/payment/payment.component";
import MyTicket from "./pages/my-ticket/my-ticket.component";

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
            {
                path: "/ve-cua-toi",
                element: <MyTicket />,
            },
        ],
    },
    {
        element: <LoginTemplate />,
        children: [
            {
                path: "/dang-nhap",
                element: <Login />,
            },
            {
                path: "/dang-ky",
                element: <Register />,
            },
        ],
    },
    {
        children: [
            {
                path: "/dat-ve/:id",
                element: <PickTime />,
            },
            {
                path: "/chon-ghe",
                element: <PickSeat />,
            },
            {
                path: "/thanh-toan",
                element: <Payment />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
    </Provider>
);
