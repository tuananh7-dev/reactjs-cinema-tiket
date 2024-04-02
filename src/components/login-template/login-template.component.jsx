import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "../header/header.component";

import "./login-template.styles.css";

function LoginTemplate() {
    return (
        <div className="login-template">
            <ToastContainer />
            <Header displayNav={false} />
            <div className="main">
                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default LoginTemplate;
