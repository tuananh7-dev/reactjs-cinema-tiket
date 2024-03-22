import { Outlet } from "react-router-dom";

import Header from "../header/header.component";
import Footer from "../footer/footer.component";

import "./main-template.styles.css";

function MainTemplate() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export default MainTemplate;
