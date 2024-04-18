import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "../../components/header/header.component";
import Button from "../../components/button/button.component";
import { getShowTimeByFilmIdThunk } from "../../redux/booking/booking.thunk";
import { getDate, getShortDay } from "../../helpers/date-time.helper";
import {
    setdateSelectedId,
    setPaymentInfo,
    setShowTimeSelected,
    increaseStep,
    setTimeSelectedId,
    resetStep,
} from "../../redux/booking/booking.slice";
import { toastError } from "../../configs/toast.config";

import "./pick-time.styles.css";

function PickTime() {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    let listTime = useRef([]);

    const { filmSelected, showTime, dateSelectedId, timeSelectedId } = useSelector((state) => state.booking);

    // Set list thoi gian ung voi ngay duoc chon
    if (dateSelectedId) {
        const showTimeSelected = showTime.find((show) => show.id == dateSelectedId);
        listTime = showTimeSelected.infos.map((item) => {
            return { id: item.id, value: item.time };
        });
    }

    // Su kien khi click chon ngay
    const onClickDate = (id) => {
        dispatch(setdateSelectedId(id));
        dispatch(setTimeSelectedId(null));
    };

    // Su kien khi click chon thoi gian
    const onClickTime = (id) => {
        dispatch(setTimeSelectedId(id));
    };

    // Su kien khi click "chon ghe"
    const onClickPickSeat = () => {
        if ((dateSelectedId, timeSelectedId)) {
            const showTimeSelected = showTime.find((show) => show.id == dateSelectedId);
            const timeSelected = showTimeSelected.infos.find((time) => time.id == timeSelectedId);
            dispatch(setShowTimeSelected(showTimeSelected));
            dispatch(
                setPaymentInfo({
                    filmName: filmSelected.name,
                    during: filmSelected.during,
                    date: showTimeSelected.date,
                    time: timeSelected.time,
                })
            );
            dispatch(increaseStep());
            navigate("/chon-ghe");
        }
        toastError("Vui lòng chọn thời gian");
    };

    useEffect(() => {
        dispatch(getShowTimeByFilmIdThunk(params.id));
        dispatch(resetStep());
        dispatch(setTimeSelectedId(null));
    }, []);

    return (
        <div className="booking">
            <ToastContainer />
            <Header />
            {filmSelected && (
                <div className="main">
                    <div className="banner">
                        {/* <img src={filmSelected?.thumbnail || "https://picsum.photos/1920/1080"} alt="banner" /> */}
                        <img src="https://picsum.photos/1920/1080" alt="banner" />
                    </div>
                    <div className="container">
                        <div className="film-info">
                            <h2>{filmSelected.name}</h2>
                            <p>{filmSelected.during} phút</p>
                        </div>
                        <div className="pick pick__date">
                            <h3 className="pick--title">Chọn ngày</h3>
                            <ul className="list list__date">
                                {showTime.map((show) => {
                                    return (
                                        <li
                                            key={show.id}
                                            className={show.id === dateSelectedId ? "selected" : ""}
                                            onClick={() => onClickDate(show.id)}
                                        >
                                            {getDate(show.date)} {getShortDay(show.date)}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="pick pick__time">
                            <h3 className="pick--title">Chọn giờ</h3>
                            <ul className="list list__time">
                                {listTime.map((time) => (
                                    <li
                                        key={time.id}
                                        className={time.id === timeSelectedId ? "selected" : ""}
                                        onClick={() => onClickTime(time.id)}
                                    >
                                        {time.value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Button type="basic" className="btn__next-step" content="Chọn ghế" onClick={onClickPickSeat} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default PickTime;
