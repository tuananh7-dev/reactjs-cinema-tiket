import { Carousel } from "@trendyol-js/react-carousel";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../components/button/button.component";
import FilmItem from "../../components/film-item/film-item.component";
import {
    filterFilmBannerThunk,
    filterFilmIsCommingThunk,
    filterFilmIsReleasedThunk,
} from "../../redux/film/film.thunk";

import SvgTicket from "../../assets/ticket-red.svg";
import SvgInfo from "../../assets/info.svg";

import "./home.styles.css";

function Home() {
    const dispatch = useDispatch();

    const { listFilmIsReleased, listFilmIsComming, listFilmBanner } = useSelector((state) => state.film);

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
                    <Link to={"/dat-ve/" + listFilmBanner[0]?.id}>
                        <Button
                            type="icon"
                            icon={SvgTicket}
                            className="btn-film-booking"
                            content="Đặt vé"
                            contentStyle="bold size-22"
                        />
                    </Link>
                    <Link to={"/phim/chi-tiet/" + listFilmBanner[0]?.id}>
                        <Button
                            type="icon"
                            icon={SvgInfo}
                            className="btn-film-info"
                            content="Thông tin khác"
                            contentStyle="bold size-22"
                        />
                    </Link>
                </div>
            </div>
            <div className="list-film">
                <h2 className="film-category">Phim đang chiếu</h2>
                {listFilmIsReleased.length > 0 && (
                    <Carousel show={6.5} slide={3} swiping={true} transition={1} className="list-film__carousel">
                        {listFilmIsReleased.map((film) => (
                            <Link key={film.id} to={"/phim/chi-tiet/" + film.id}>
                                <FilmItem thumbnail={film.thumbnail} name={film.name} />
                            </Link>
                        ))}
                    </Carousel>
                )}
            </div>
            <div className="list-film">
                <h2 className="film-category">Phim sắp chiếu</h2>
                {listFilmIsComming.length > 0 && (
                    <Carousel show={6.5} slide={3} swiping={true} transition={1} className="list-film__carousel">
                        {listFilmIsComming.map((film) => (
                            <Link key={film.id} to={"/phim/chi-tiet/" + film.id}>
                                <FilmItem thumbnail={film.thumbnail} name={film.name} />
                            </Link>
                        ))}
                    </Carousel>
                )}
            </div>
        </>
    );
}

export default Home;
