import { Link } from "react-router-dom";

import "./footer.styles.css";

function Footer() {
    return (
        <footer>
            <div className="footer--group">
                <p className="footer--group__title">Cinema tiket Việt Nam</p>
                <ul className="footer--group__content">
                    <li>
                        <Link to="#">Giới thiệu</Link>
                    </li>
                    <li>
                        <Link to="#">Hệ thống rạp</Link>
                    </li>
                    <li>
                        <Link to="#">Liên hệ</Link>
                    </li>
                </ul>
            </div>
            <div className="footer--group">
                <p className="footer--group__title">Điều khoản sử dụng</p>
                <ul className="footer--group__content">
                    <li>
                        <Link to="#">Quy định thành viên</Link>
                    </li>
                    <li>
                        <Link to="#">Điều khoản</Link>
                    </li>
                    <li>
                        <Link to="#">Hướng dẫn đặt vé</Link>
                    </li>
                </ul>
            </div>
            <div className="footer--group">
                <p className="footer--group__title">Chăm sóc khách hàng</p>
                <ul className="footer--group__content">
                    <li>
                        <Link to="#">Hotline: 1900 7749</Link>
                    </li>
                    <li>
                        <Link to="#">Giờ làm việc: 8h - 23h</Link>
                    </li>
                    <li>
                        <Link to="#">Email: tuananh7.devtest@gmail.com</Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
