import { Carousel } from "@trendyol-js/react-carousel";
import { Link } from "react-router-dom";

import JpgBannerTest from "../../assets/banner-test.jpg";
import SvgTicket from "../../assets/ticket.svg";
import SvgInfo from "../../assets/info.svg";
import Film1 from "../../assets/film-1.jpg";
import Film2 from "../../assets/film-2.jpg";
import Film3 from "../../assets/film-3.jpg";
import Film4 from "../../assets/film-4.jpg";
import Film5 from "../../assets/film-5.jpg";
import Film6 from "../../assets/film-6.jpg";
import Film7 from "../../assets/film-7.jpg";
import Film8 from "../../assets/film-8.jpg";
import Film9 from "../../assets/film-9.jpg";
import Film10 from "../../assets/film-10.jpg";

import "./home.styles.css";

function Home() {
    return (
        <>
            <div className="banner">
                <img className="banner" src={JpgBannerTest} alt="" />
                <div className="list-button">
                    <Link to="#">
                        <button className="btn-basic btn-film-booking">
                            <img src={SvgTicket} alt="" />
                            <span>Đặt vé</span>
                        </button>
                    </Link>
                    <Link to="#">
                        <button className="btn-basic btn-film-info">
                            <img src={SvgInfo} alt="" />
                            <span>Thông tin khác</span>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="list-film">
                <h2 className="film-category">Phim đang chiếu</h2>
                <Carousel show={6.5} slide={3} swiping={true} transition={1} className="list-film--current">
                    <img src={Film1} alt="film-1" />
                    <img src={Film2} alt="film-2" />
                    <img src={Film3} alt="film-3" />
                    <img src={Film4} alt="film-4" />
                    <img src={Film5} alt="film-5" />
                    <img src={Film6} alt="film-6" />
                    <img src={Film7} alt="film-7" />
                </Carousel>
                <div className="list-film--comming"></div>
            </div>
            <div className="list-film">
                <h2 className="film-category">Phim sắp chiếu</h2>
                <Carousel show={6.5} slide={3} swiping={true} transition={1} className="list-film--current">
                    <img src={Film10} alt="film-10" />
                    <img src={Film8} alt="film-8" />
                    <img src={Film6} alt="film-6" />
                    <img src={Film1} alt="film-1" />
                    <img src={Film9} alt="film-9" />
                    <img src={Film3} alt="film-3" />
                    <img src={Film7} alt="film-7" />
                </Carousel>
                <div className="list-film--comming"></div>
            </div>
        </>
    );
}

export default Home;
