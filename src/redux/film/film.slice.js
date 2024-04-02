import { createSlice } from "@reduxjs/toolkit";
import {
    filterFilmBannerThunk,
    filterFilmIsCommingThunk,
    filterFilmIsReleasedThunk,
    getFilmByIdThunk,
    getRandomFilmReleasedThunk,
} from "./film.thunk";

const initialState = {
    listFilm: [],
    listFilmIsReleased: [],
    listFilmIsReleased: [],
    listFilmIsComming: [],
    listFilmBanner: [],
    listFilmIsReleasedRandom: [],
    filmDetail: null,
    playTrailer: "",
};

export const filmSlice = createSlice({
    name: "flim",
    initialState,
    reducers: {
        setListFlim: (state, action) => {
            state.listFilm = action.payload;
        },
        setPlayTrailer: (state, action) => {
            state.playTrailer = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(filterFilmIsReleasedThunk.fulfilled, (state, action) => {
                state.listFilmIsReleased = action.payload;
            })
            .addCase(filterFilmIsCommingThunk.fulfilled, (state, action) => {
                state.listFilmIsComming = action.payload;
            })
            .addCase(filterFilmBannerThunk.fulfilled, (state, action) => {
                state.listFilmBanner = action.payload;
            })
            .addCase(getFilmByIdThunk.fulfilled, (state, action) => {
                state.filmDetail = action.payload;
            })
            .addCase(getRandomFilmReleasedThunk.fulfilled, (state, action) => {
                state.listFilmIsReleasedRandom = action.payload;
            });
    },
});

export const { setListFlim, setPlayTrailer } = filmSlice.actions;

export default filmSlice.reducer;
