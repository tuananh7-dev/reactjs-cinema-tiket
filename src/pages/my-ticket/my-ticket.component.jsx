import { QRCodeSVG } from "qrcode.react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { calcTimeEndFilm, formatDate } from "../../helpers/date-time.helper";
import { getMyTicketThunk } from "../../redux/ticket/ticket.thunk";

import "./my-ticket.styles.css";
import { formatCurrency } from "../../helpers/curency.helper";

const SEAT_ROW = ["A", "B", "C", "D", "E", "F", "G", "H", "J"];

function MyTicket() {
    const { myTicket } = useSelector((state) => state.ticket);
    const [ticketDetail, setTicketDetal] = useState(null);
    const dispatch = useDispatch();

    // Su kien an vao 1 ticket => Hien thi thong tin chi tiet
    const onClickTicket = (code) => {
        setTicketDetal(myTicket.find((ticket) => ticket.code == code));
    };

    useEffect(() => {
        dispatch(getMyTicketThunk());
    }, []);

    return (
        <div className="my-ticket">
            <h2>VÉ CỦA TÔI</h2>
            <div className="info">
                <div className="ticket scrollable">
                    {myTicket &&
                        myTicket.map((ticket) => (
                            <div key={ticket.code} className="ticket__item" onClick={() => onClickTicket(ticket.code)}>
                                <img className="ticket__item--img" src={ticket.thumbnail} alt="thumbnail" />
                                <div className="ticket__item--general">
                                    <h3>{ticket.filmName}</h3>
                                    <p>{formatDate(ticket.date)}</p>
                                    <p>
                                        {ticket.time} ~ {calcTimeEndFilm(ticket.time, ticket.during)}
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="ticket-detail">
                    {ticketDetail && (
                        <>
                            <div className="qr-code">
                                <QRCodeSVG value={ticketDetail.code} width="150" height="150" />
                                <p>
                                    <small>
                                        <i>Quét QR code để vào phòng chiếu</i>
                                    </small>
                                </p>
                            </div>
                            <div className="film-info">
                                <p>{ticketDetail.filmName}</p>
                                <p>{formatDate(ticketDetail.date)}</p>
                                <p>
                                    {ticketDetail.time} ~ {calcTimeEndFilm(ticketDetail.time, ticketDetail.during)}
                                </p>
                                <p>Mã đặt vé: {ticketDetail.code}</p>
                                <p>
                                    Ghế:{" "}
                                    {ticketDetail.seats
                                        .map((seat) => {
                                            return SEAT_ROW[Math.floor(seat / 16)] + (seat % 16).toString();
                                        })
                                        .join(", ")}
                                </p>
                                <p>Phòng chiếu: {ticketDetail.room}</p>
                            </div>
                            <div className="total-price">
                                <p>Thành tiền</p>
                                <p>{formatCurrency(ticketDetail.totalPrice)}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyTicket;
