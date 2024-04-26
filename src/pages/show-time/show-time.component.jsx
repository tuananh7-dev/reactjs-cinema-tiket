import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { filterFilmIsReleasedThunk } from "../../redux/film/film.thunk";
import Button from "../../components/button/button.component";

import "./show-time.styles.css";

function ShowTime() {
    const dispatch = useDispatch();

    const { listFilmIsReleased } = useSelector((state) => state.film);

    useEffect(() => {
        dispatch(filterFilmIsReleasedThunk());
    }, []);
    return (
        <div className="show-time">
            <div className="main">
                <div className="list-film">
                    {listFilmIsReleased.length > 0 &&
                        listFilmIsReleased.map((film) => (
                            <div key={film.id} className="film-item">
                                <Link to={"/phim/chi-tiet/" + film.id} className="film__thumbnail">
                                    <img src={film.thumbnail} alt="film image" />
                                </Link>
                                <p className="film__name">{film.name}</p>
                                <p className="film__during">Thời lượng: {film.during} phút</p>
                                <Link to={"/dat-ve/" + film.id} className="film__booking">
                                    <Button type="basic" content="Đặt vé" className="btn-booking" />
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default ShowTime;
