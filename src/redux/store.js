import { configureStore } from "@reduxjs/toolkit";

import filmReducer from "../redux/film/film.slice";

const store = configureStore({
    reducer: {
        film: filmReducer,
    },
});
export default store;
