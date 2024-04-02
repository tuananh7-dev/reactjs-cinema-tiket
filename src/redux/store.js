import { configureStore } from "@reduxjs/toolkit";

import filmReducer from "../redux/film/film.slice";
import accountReducer from "../redux/account/account.slice";

const store = configureStore({
    reducer: {
        film: filmReducer,
        account: accountReducer,
    },
});
export default store;
