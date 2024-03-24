import { Carousel } from "@trendyol-js/react-carousel";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    filterFilmBannerThunk,
    filterFilmIsCommingThunk,
    filterFilmIsReleasedThunk,
} from "../../redux/film/film.thunk";

import JpgBannerTest from "../../assets/banner-test.jpg";
import SvgTicket from "../../assets/ticket.svg";
import SvgInfo from "../../assets/info.svg";

import "./home.styles.css";

function Home() {
    const dispatch = useDispatch();

    const { listFilmIsReleased, listFilmIsComming, listFilmBanner } = useSelector((state) => state.film);
    console.log("🚀 ~ Home ~ listFilmBanner:", listFilmBanner);
    console.log("🚀 ~ Home ~ listFilmIsComming:", listFilmIsComming);
    console.log("🚀 ~ Home ~ listFilmIsReleased:", listFilmIsReleased);

    useEffect(() => {
        dispatch(filterFilmIsReleasedThunk());
        dispatch(filterFilmIsCommingThunk());
        dispatch(filterFilmBannerThunk());
    }, []);

    return (
        <>
            <div className="banner">
                <img className="banner" src={listFilmBanner[0]?.banner} alt="" />
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
                {listFilmIsReleased.length > 0 && (
                    <Carousel show={6.5} slide={3} swiping={true} transition={1} className="list-film__carousel">
                        {listFilmIsReleased.map((film) => (
                            <img key={film.id} src={film.thumbnail} alt={film.name} title={film.name} />
                        ))}
                    </Carousel>
                )}
            </div>
            <div className="list-film">
                <h2 className="film-category">Phim sắp chiếu</h2>
                {listFilmIsComming.length > 0 && (
                    <Carousel show={6.5} slide={3} swiping={true} transition={1} className="list-film__carousel">
                        {listFilmIsComming.map((film) => (
                            <img key={film.id} src={film.thumbnail} alt={film.name} title={film.name} />
                        ))}
                    </Carousel>
                )}
            </div>
        </>
    );
}

export default Home;
