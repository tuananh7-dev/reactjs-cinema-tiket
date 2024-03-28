import { Link, NavLink } from "react-router-dom";

import Button from "../button/button.component";
import logo from "../../assets/cinema-ticket-logo.png";

import "./header.styles.css";
import { useEffect, useState } from "react";

function Header() {
    const [bgrHeader, setBgrHeader] = useState("");

    const listenScrollEvent = (e) => {
        if (window.scrollY > 150) {
            setBgrHeader({ color: "black" });
        } else {
            setBgrHeader({ color: "transparent" });
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
    }, []);

    return (
        <header style={{ backgroundColor: bgrHeader.color }}>
            <div className="header--left">
                <Link to="/">
                    <img className="logo" src={logo} alt="logo" />
                </Link>
                <ul className="primary-navigation">
                    <li>
                        <NavLink to="/">Trang chủ</NavLink>
                    </li>
                    <li>
                        <NavLink to="/lich-chieu">Lịch chiếu</NavLink>
                    </li>
                </ul>
            </div>
            <div className="header--right">
                <Button className="secondary-navigation" content="Đăng nhập/đăng kí" />
            </div>
        </header>
    );
}

export default Header;
