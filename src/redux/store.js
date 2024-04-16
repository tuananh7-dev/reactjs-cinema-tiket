import { configureStore } from "@reduxjs/toolkit";

import filmReducer from "../redux/film/film.slice";
import accountReducer from "../redux/account/account.slice";
import bookingReducer from "../redux/booking/booking.slice";

const store = configureStore({
    reducer: {
        film: filmReducer,
        account: accountReducer,
        booking: bookingReducer,
    },
});
export default store;
