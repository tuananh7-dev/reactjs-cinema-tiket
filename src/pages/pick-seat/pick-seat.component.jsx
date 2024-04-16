import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import CountDownTime from "./count-down-time.component";
import Button from "../../components/button/button.component";
import { getRoomStructureThunk } from "../../redux/booking/booking.thunk";
import { removeSeatSelected, setPaymentInfo, setSeatSelected } from "../../redux/booking/booking.slice";
import { toastError } from "../../configs/toast.config";
import { formatCurrency } from "../../helpers/curency.helper";

import SvgSeatNormal from "../../assets/ghe-thuong.svg";
import SvgSeatNormalSelected from "../../assets/ghe-thuong-chon.svg";
import SvgSeatNormalBooked from "../../assets/ghe-thuong-booked.svg";
import SvgSeatDouble from "../../assets/ghe-doi.svg";
import SvgSeatDoubleSelected from "../../assets/ghe-doi-chon.svg";
import SvgSeatDoubleBooked from "../../assets/ghe-doi-booked.svg";
import SvgSeatVip from "../../assets/ghe-vip.svg";
import SvgSeatVipSelected from "../../assets/ghe-vip-chon.svg";
import SvgSeatVipBooked from "../../assets/ghe-vip-booked.svg";

import "./pick-seat.styles.css";

const SEAT_AVAIABLE = {
    normal: SvgSeatNormal,
    vip: SvgSeatVip,
    double: SvgSeatDouble,
};

const SEAT_BOOKED = {
    normal: SvgSeatNormalBooked,
    vip: SvgSeatVipBooked,
    double: SvgSeatDoubleBooked,
};

const SEAT_SELECTED = {
    normal: SvgSeatNormalSelected,
    vip: SvgSeatVipSelected,
    double: SvgSeatDoubleSelected,
};

const SEAT_TITLE = {
    normal: "Ghế thường",
    vip: "Ghế VIP",
    double: "Ghế đôi",
};

const SEAT_ROW = ["A", "B", "C", "D", "E", "F", "G", "H", "J"];

function PickSeat() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let bookedSeats = useRef([]);
    let totalPrice = useRef(0);

    const { filmSelected, timeSelectedId, showTimeSelected, roomStructure, seatSelected } = useSelector(
        (state) => state.booking
    );

    // Su kien chon ghe trong
    const onSelectSeat = (seatId, type) => {
        // Kiem tra ghe da duoc chon truoc do chua
        const isSeatSelected = seatSelected.find((seat) => seat.seatId == seatId);
        if (!isSeatSelected) {
            // Lay gia ghe
            const priceConfig = roomStructure.seatConfigs.find((seat) => seat.type == type);
            dispatch(setSeatSelected({ seatId, type, price: priceConfig.price }));
        } else {
            dispatch(removeSeatSelected(seatId));
        }
    };

    // Tinh thanh tien
    if (seatSelected) {
        totalPrice.current = seatSelected.reduce((total, seat) => {
            return (total += seat.price);
        }, 0);
    }

    // Su kien an nut thanh toan
    const onClickPayment = () => {
        if (seatSelected.length > 0) {
            // Danh sach ghe da chon
            const seats = seatSelected.map((seat) => seat.seatId);
            dispatch(
                setPaymentInfo({
                    totalPrice: totalPrice.current,
                    seats,
                    room: roomStructure.name,
                })
            );
            navigate("/thanh-toan");
        } else {
            toastError("Vui lòng chọn ít nhất 1 ghế");
        }
    };

    useEffect(() => {
        if (!filmSelected) {
            navigate(-1);
            return;
        }
        dispatch(getRoomStructureThunk(showTimeSelected.roomId));
        // Lay ra id cac ghe da duoc dat
        const bookedSeatInfos = showTimeSelected.infos.find((item) => item.id == timeSelectedId).bookedSeats;
        const temp = [];
        bookedSeatInfos.forEach((item) => {
            temp.push(...item.seats);
        });
        bookedSeats.current = temp;
    }, []);

    // Tao so do cho ngoi
    const seatMap = [];
    if (roomStructure) {
        let count = -1;
        const structures = roomStructure.structures;
        for (let i = 0; i < structures.length; i++) {
            // Danh dau ten hang
            count++;
            if (count % 17 === 0) {
                seatMap.push(
                    <h4 key={"row" + structures[i].id} className="seat__map--item">
                        {SEAT_ROW[count / 17]}
                    </h4>
                );
                i--;
                continue;
            }
            // Kiem tra ghe da duoc booked chua
            const isBooked = bookedSeats.current.includes(structures[i].id);
            if (isBooked) {
                if (structures[i].type == "double") {
                    count++;
                    seatMap.push(
                        <img
                            key={structures[i].id}
                            className="seat__map--item seat-img seat__booked seat--double"
                            src={SEAT_BOOKED[structures[i].type]}
                            alt={structures[i].id}
                            title={SEAT_TITLE[structures[i].type]}
                        />
                    );
                } else {
                    seatMap.push(
                        <img
                            key={structures[i].id}
                            className="seat__map--item seat-img seat__booked"
                            src={SEAT_BOOKED[structures[i].type]}
                            alt={structures[i].id}
                            title={SEAT_TITLE[structures[i].type]}
                        />
                    );
                }
            }
            // Kiem tra co phai loi di khong
            else if (structures[i].type === "empty") {
                seatMap.push(<div key={structures[i].id} className="seat__map--item seat-img seat__empty"></div>);
            }
            // Ghe trong chua duoc booked
            else {
                // Kiem tra ghe da duoc chon truoc do chua
                const isSeatSelected = seatSelected.find((seat) => seat.seatId == structures[i].id);
                const src = isSeatSelected ? SEAT_SELECTED[structures[i].type] : SEAT_AVAIABLE[structures[i].type];
                let extraClass = "";
                // Css cho ghe double
                if (structures[i].type == "double") {
                    count++;
                    extraClass += " seat--double";
                }
                seatMap.push(
                    <img
                        key={structures[i].id}
                        className={`seat__map--item seat-img seat__avaiable ${extraClass}`}
                        src={src}
                        alt={structures[i].id}
                        title={SEAT_TITLE[structures[i].type]}
                        onClick={() => onSelectSeat(structures[i].id, structures[i].type)}
                    />
                );
            }
        }
    }

    return (
        <>
            {roomStructure && (
                <div className="pick-seat">
                    <header>
                        <h2>Chọn ghế</h2>
                        <div className="count-down-time">
                            <p>Thời gian còn lại:</p>
                            {/* <p className="count-down">06:32</p> */}
                            <CountDownTime />
                        </div>
                    </header>
                    <div className="main">
                        <div className="film-info">
                            <b>Thợ săn hoang mạc</b>
                            <p>Phòng chiếu 1 - 17/03/2024 22:50 ~ 24:00</p>
                        </div>
                        <div className="container">
                            <div className="screen-info">
                                <div className="screen"></div>
                            </div>
                            <div className="seats">
                                <div className="seat__desc">
                                    <div className="seat__desc--item">
                                        <img className="seat-img seat__example" src={SvgSeatNormalSelected} alt="" />
                                        <p>Ghế đã chọn</p>
                                    </div>
                                    <div className="seat__desc--item">
                                        <img className="seat-img seat__example" src={SvgSeatNormalBooked} alt="" />
                                        <p>Ghế đã bán</p>
                                    </div>
                                    <div className="seat__desc--item">
                                        <img className="seat-img seat__example" src={SvgSeatNormal} alt="" />
                                        <p>Ghế thường</p>
                                    </div>
                                    <div className="seat__desc--item">
                                        <img className="seat-img seat__example" src={SvgSeatVip} alt="" />
                                        <p>Ghế VIP</p>
                                    </div>
                                    <div className="seat__desc--item">
                                        <img className="seat-img seat__example" src={SvgSeatDouble} alt="" />
                                        <p>Ghế đôi</p>
                                    </div>
                                </div>
                                <div className="seat__map">{seatMap}</div>
                            </div>
                        </div>
                    </div>

                    <footer>
                        <div className="container">
                            <div className="ft__left">
                                <h3>Thành tiền</h3>
                                <div className="seat-selected">
                                    <span>
                                        {seatSelected.length} ghế - {formatCurrency(totalPrice.current * 1000)}
                                    </span>
                                </div>
                            </div>
                            <Button
                                type="basic"
                                className="btn__next-step"
                                content="Thanh toán"
                                onClick={onClickPayment}
                            />
                        </div>
                    </footer>
                </div>
            )}
        </>
    );
}

export default PickSeat;
