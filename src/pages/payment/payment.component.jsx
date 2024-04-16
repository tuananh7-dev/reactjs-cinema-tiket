import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/button/button.component";
import { genQRCodeThunk } from "../../redux/booking/booking.thunk";
import { formatDate } from "../../helpers/date-time.helper";

import "./payment.styles.css";
import { formatCurrency } from "../../helpers/curency.helper";

function Payment() {
    const { paymentInfo, seatSelected } = useSelector((state) => state.booking);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [qrCode, setQRCode] = useState(null);
    let timeEndFilm = useRef("");

    // Tinh toan thoi gian ket thuc phim
    const timeStart = paymentInfo.time.split(":");
    const hourStart = timeStart[0];
    const minuteStart = timeStart[1];
    const date = new Date();
    date.setHours(hourStart, minuteStart);
    date.setMinutes(date.getMinutes() + paymentInfo.during);
    timeEndFilm.current = date.getHours() + ":" + date.getMinutes();

    useEffect(() => {
        if (seatSelected?.length == 0) {
            navigate(-2);
        }
        async function genQRCode() {
            if (seatSelected?.length > 0) {
                const res = await dispatch(genQRCodeThunk(seatSelected));
                setQRCode(res.payload);
            }
        }
        genQRCode();
    }, []);

    return (
        <>
            {paymentInfo && (
                <div className="payment">
                    <header>
                        <h2>Thanh toán</h2>
                    </header>
                    <div className="main">
                        <p className="title">Thông tin vé</p>
                        <p>Phim: {paymentInfo.filmName}</p>
                        <p>
                            Thời gian: {formatDate(paymentInfo.date)} {paymentInfo.time} ~ {timeEndFilm.current}
                        </p>
                        <p>Phòng chiếu: {paymentInfo.room}</p>
                        <p>Ghế: E7</p>
                        <p>Tổng cộng: {formatCurrency(paymentInfo.totalPrice * 1000)}</p>
                        <p className="title">Thanh toán</p>
                        <p>
                            Quý khách vui lòng thanh toán qua hình thức chuyển khoản ngân hàng, sau đó ấn vào nút "Xác
                            nhận đã thanh toán" để hoàn thành đặt vé{" "}
                        </p>
                        <p>* Lưu ý: chỉ "Xác nhận đã thanh toán" sau khi đã chuyển khoản</p>
                        <div className="banking">
                            <div className="qr-code">
                                {qrCode ? (
                                    <img src={qrCode.qrCodeBase64} alt="qr-code" />
                                ) : (
                                    <div className="qr-default"></div>
                                )}
                            </div>
                            <div className="info">
                                <h3>Thông tin thanh toán</h3>
                                <b>Số tiền thanh toán</b>
                                <p>{formatCurrency(paymentInfo.totalPrice * 1000)}</p>
                                <b>Tài khoản nhận</b>
                                <p>TIMO - Ngân hàng Timo by Ban Viet Bank (Timo by Ban Viet Bank)</p>
                                <p>012547852456131</p>
                                <b>Nội dung</b>
                                <p>{qrCode?.content}</p>
                                <Button type="basic" content="Xác nhận hoàn thành" className="btn__accept-payment" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Payment;
