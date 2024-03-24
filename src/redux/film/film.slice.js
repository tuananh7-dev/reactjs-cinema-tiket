import { createSlice } from "@reduxjs/toolkit";
import { filterFilmBannerThunk, filterFilmIsCommingThunk, filterFilmIsReleasedThunk } from "./film.thunk";

const initialState = {
    listFilm: [],
    listFilmIsReleased: [],
    listFilmIsComming: [],
    listFilmBanner: [],
};

export const filmSlice = createSlice({
    name: "flim",
    initialState,
    reducers: {
        setListFlim: (state, action) => {
            state.listFilm = action.payload;
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
            });
    },
});

export const { setListFlim } = filmSlice.actions;

export default filmSlice.reducer;
