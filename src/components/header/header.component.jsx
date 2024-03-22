import { Link, NavLink } from "react-router-dom";

import logo from "../../assets/cinema-ticket-logo.svg";

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
                <button className="secondary-navigation">Đăng nhập/đăng kí</button>
            </div>
        </header>
    );
}

export default Header;
