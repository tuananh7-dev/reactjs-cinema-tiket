import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { toastError, toastWarning, toastSuccess } from "../../configs/toast.config";

// Thoi gian dem nguoc (don vi: s)
const INITIAL_COUNT_DOWN_TIME = 7 * 60;
// Thoi gian warning
const TIME_WARNING = 30;

function CountDownTime() {
    const [time, setTime] = useState(INITIAL_COUNT_DOWN_TIME);
    const navigate = useNavigate();

    if (time === 0) {
        setTimeout(() => {
            toastError("Bạn đã hết thời gian chọn ghế, trang sẽ được tải lại sau 3s");
            setTimeout(() => {
                navigate(0);
                window.history.replaceState(null, "", "/");
            }, 3000);
        }, 100);
    } else if (time === TIME_WARNING) {
        setTimeout(() => {
            toastWarning(`Chỉ còn ${TIME_WARNING}s để chọn ghế, nhanh lên nào !`);
        }, 100);
    }
    useEffect(() => {
        let timer = setInterval(() => {
            setTime((time) => {
                if (time === 0) {
                    clearInterval(timer);
                    return 0;
                } else return time - 1;
            });
        }, 1000);
        setTimeout(() => {
            toastSuccess("Bạn có 7 phút để thực hiện chọn ghế");
        }, 300);
    }, []);

    return (
        <>
            <ToastContainer />
            <p className="count-down">
                {`${Math.floor(time / 60)}`.padStart(2, 0)}:{`${time % 60}`.padStart(2, 0)}
            </p>
        </>
    );
}

export default CountDownTime;
