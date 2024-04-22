import { createSlice } from "@reduxjs/toolkit";
import { getMyTicketThunk } from "./ticket.thunk";

const initialState = {
    myTicket: [],
};

const ticketSlice = createSlice({
    name: "ticket",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getMyTicketThunk.fulfilled, (state, action) => {
            state.myTicket = action.payload;
        });
    },
});

export const { setMyTicket } = ticketSlice.actions;

export default ticketSlice.reducer;
