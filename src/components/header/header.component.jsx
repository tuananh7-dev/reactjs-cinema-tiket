import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getMeThunk } from "../../redux/account/account.thunk";
import Button from "../button/button.component";
import PngLogo from "../../assets/cinema-ticket-logo.png";
import SvgAvatar from "../../assets/avatar.svg";

import "./header.styles.css";

function Header({ displayNav = true }) {
    const [bgrHeader, setBgrHeader] = useState("");
    const [showDropDown, setShowDropDown] = useState(false);
    let dropdownRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { profile } = useSelector((state) => state.account);

    const listenScrollEvent = (e) => {
        if (window.scrollY > 150) {
            setBgrHeader({ color: "black" });
        } else {
            setBgrHeader({ color: "transparent" });
        }
    };

    const toggleDropDown = () => {
        setShowDropDown(!showDropDown);
    };

    // Su kien dang xuat
    const onLogout = () => {
        localStorage.removeItem("token");
        navigate("/dang-nhap");
    };

    useEffect(() => {
        dispatch(getMeThunk());
        window.addEventListener("scroll", listenScrollEvent);
        // Xu ly su kien an dropdown
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropDown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
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
            ) : !profile ? (
                <div className="header--right">
                    <Link to="/dang-nhap">
                        <Button className="secondary-navigation" content="Đăng nhập/đăng kí" />
                    </Link>
                </div>
            ) : (
                <div className="profile-info" ref={dropdownRef}>
                    <img className="avt" src={SvgAvatar} alt="avatar" onClick={toggleDropDown} />
                    {showDropDown && (
                        <ul className="drop-down">
                            <li>Tài khoản</li>
                            <Link to="/ve-cua-toi" onClick={toggleDropDown}>
                                <li>Vé của tôi</li>
                            </Link>
                            <li onClick={onLogout}>Đăng xuất</li>
                        </ul>
                    )}
                </div>
            )}
        </header>
    );
}

export default Header;
