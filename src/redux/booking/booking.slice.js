import { createSlice } from "@reduxjs/toolkit";
import { getRoomStructureThunk, getShowTimeByFilmIdThunk } from "./booking.thunk";

const initialState = {
    step: 0,
    filmSelected: null,
    showTime: null,
    showTimeSelected: null,
    dateSelectedId: null,
    timeSelectedId: null,
    roomStructure: null,
    seatSelected: [],
    paymentInfo: {
        filmName: "",
        date: "",
        time: "",
        during: 0,
        room: "",
        seats: [],
        totalPrice: 0,
    },
};

export const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setdateSelectedId: (state, action) => {
            state.dateSelectedId = action.payload;
        },
        setTimeSelectedId: (state, action) => {
            state.timeSelectedId = action.payload;
        },
        setShowTimeSelected: (state, action) => {
            state.showTimeSelected = action.payload;
        },
        setSeatSelected: (state, action) => {
            state.seatSelected.push(action.payload);
        },
        resetSeatSelected: (state, action) => {
            state.seatSelected = [];
        },
        removeSeatSelected: (state, action) => {
            state.seatSelected = state.seatSelected.filter((seat) => seat.seatId != action.payload);
        },
        setPaymentInfo: (state, action) => {
            state.paymentInfo = { ...state.paymentInfo, ...action.payload };
        },
        increaseStep: (state, action) => {
            state.step = state.step + 1;
        },
        resetStep: (state, action) => {
            state.step = 1;
        },
        resetBooking: (state) => {
            state.step = 0;
            state.filmSelected = null;
            state.showTime = null;
            state.showTimeSelected = null;
            state.dateSelectedId = null;
            state.timeSelectedId = null;
            state.roomStructure = null;
            state.seatSelected = [];
            state.paymentInfo = {
                filmName: "",
                date: "",
                time: "",
                during: 0,
                room: "",
                seats: [],
                totalPrice: 0,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getShowTimeByFilmIdThunk.fulfilled, (state, action) => {
                state.filmSelected = action.payload.film;
                state.showTime = action.payload.showTime;
                state.dateSelectedId = state.showTime[0].id;
            })
            .addCase(getRoomStructureThunk.fulfilled, (state, action) => {
                state.roomStructure = action.payload;
            });
    },
});

export const {
    setdateSelectedId,
    setTimeSelectedId,
    setShowTimeSelected,
    setSeatSelected,
    removeSeatSelected,
    setPaymentInfo,
    increaseStep,
    resetStep,
    resetBooking,
    resetSeatSelected,
} = bookingSlice.actions;

export default bookingSlice.reducer;
