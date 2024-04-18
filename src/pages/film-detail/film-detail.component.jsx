import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import Button from "../../components/button/button.component";
import PngTicket from "../../assets/ticket.svg";
import Jpg404Image from "../../assets/404-image.jpg";
import SvgPlay from "../../assets/play.svg";

import FilmItem from "../../components/film-item/film-item.component";
import TrailerModal from "../../components/trailer-modal/trailer-modal.component";
import { setPlayTrailer } from "../../redux/film/film.slice";
import { getFilmByIdThunk, getRandomFilmReleasedThunk } from "../../redux/film/film.thunk";

import "./film-detail.styles.css";

function FilmDetail() {
    const dispatch = useDispatch();
    const params = useParams();

    const { listFilmIsReleasedRandom, filmDetail } = useSelector((state) => state.film);

    useEffect(() => {
        dispatch(getFilmByIdThunk(params.id));
        dispatch(getRandomFilmReleasedThunk());
    }, []);

    // Su kien khi click vao trailer => cap nhat video id vao state => Mo modal
    const onClickTrailer = (videoId) => {
        dispatch(setPlayTrailer(videoId));
    };

    // Su kien khi bam vao phim khac
    const onClickOtherFilm = (filmId) => {
        dispatch(getFilmByIdThunk(filmId));
        dispatch(getRandomFilmReleasedThunk());
        window.history.pushState({}, "", "/phim/chi-tiet/" + filmId);
    };

    return (
        <div className="film-detail">
            <div className="detail-left">
                <img
                    className="main-thumbnail"
                    src={filmDetail ? filmDetail.thumbnail : Jpg404Image}
                    alt={filmDetail?.name}
                />
                {filmDetail && (
                    <Link to={"/dat-ve/" + filmDetail.id}>
                        <Button
                            type="icon"
                            icon={PngTicket}
                            className="btn-booking"
                            content="ĐẶT VÉ"
                            contentStyle="bold size-22"
                        />
                    </Link>
                )}
            </div>
            <div className="detail-right">
                {filmDetail && (
                    <>
                        <div className="film-info">
                            <h2 className="film-info__title film__name">{filmDetail.name}</h2>
                            <span className="film__txt film__released-at">Năm phát hành: {filmDetail.releasedAt}</span>
                            <span className="film__txt film__duration">Thời lượng: {filmDetail.during} phút</span>
                            <span className="film__txt film__director">
                                Đạo diễn: {filmDetail.directors.join(", ")}
                            </span>
                            <span className="film__txt film__actor">Diễn viên: {filmDetail.actors.join(", ")}</span>
                            <span className="film__txt film__desc">{filmDetail.desc}</span>
                        </div>
                        <div className="film-trailer">
                            <h2 className="film-info__title">Trailer</h2>
                            <div className="trailer-list">
                                <div
                                    className="trailer-item"
                                    onClick={() => {
                                        onClickTrailer(filmDetail.trailer.split("v=")[1]);
                                    }}
                                >
                                    <img
                                        className="trailer"
                                        src={
                                            "https://i.ytimg.com/vi/" + filmDetail.trailer.split("v=")[1] + "/hq720.jpg"
                                        }
                                        alt="trailer"
                                    />
                                    <div className="bgr-trailer-play">
                                        <img className="trailer-play" src={SvgPlay} alt="play" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <div className="film-other">
                    <h2 className="film-info__title">Phim khác</h2>
                    {listFilmIsReleasedRandom.slice(0, 4).map((film) => (
                        <FilmItem
                            key={film.id}
                            thumbnail={film.thumbnail}
                            name={film.name}
                            onClick={() => onClickOtherFilm(film.id)}
                        />
                    ))}
                    ``
                </div>
            </div>
            <TrailerModal />
        </div>
    );
}

export default FilmDetail;
