import { createSlice } from "@reduxjs/toolkit";
import { getMeThunk } from "./account.thunk";

const initialState = {
    profile: null,
};

export const accountSlide = createSlice({
    name: "account",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMeThunk.fulfilled, (state, action) => {
            state.profile = action.payload;
        });
    },
});

export default accountSlide.reducer;
