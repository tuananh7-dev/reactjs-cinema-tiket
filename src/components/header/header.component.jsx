import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setIsLogin } from "../../redux/account/account.slice";
import Button from "../button/button.component";
import PngLogo from "../../assets/cinema-ticket-logo.png";
import SvgAvatar from "../../assets/avatar.svg";

import "./header.styles.css";

function Header({ displayNav = true }) {
    const [bgrHeader, setBgrHeader] = useState("");
    const dispatch = useDispatch();

    const { isLogin } = useSelector((state) => state.account);

    const listenScrollEvent = (e) => {
        if (window.scrollY > 150) {
            setBgrHeader({ color: "black" });
        } else {
            setBgrHeader({ color: "transparent" });
        }
    };

    useEffect(() => {
        dispatch(setIsLogin());
        window.addEventListener("scroll", listenScrollEvent);
    }, []);

    return (
        <header style={{ backgroundColor: bgrHeader.color }}>
            <div className="header--left">
                <Link to="/">
                    <img className="logo" src={PngLogo} alt="logo" />
                </Link>
                {displayNav && (
                    <ul className="primary-navigation">
                        <li>
                            <NavLink to="/">Trang chủ</NavLink>
                        </li>
                        <li>
                            <NavLink to="/lich-chieu">Lịch chiếu</NavLink>
                        </li>
                    </ul>
                )}
            </div>
            {!displayNav ? (
                false
            ) : !isLogin ? (
                <div className="header--right">
                    <Link to="/dang-nhap">
                        <Button className="secondary-navigation" content="Đăng nhập/đăng kí" />
                    </Link>
                </div>
            ) : (
                <Link to="/dang-nhap">
                    <img className="avt" src={SvgAvatar} alt="avatar" />
                </Link>
            )}
        </header>
    );
}

export default Header;
