import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: false,
};

export const accountSlide = createSlice({
    name: "account",
    initialState,
    reducers: {
        setIsLogin: (state, action) => {
            state.isLogin = localStorage.getItem("token") ? true : false;
        },
    },
});

export const { setIsLogin } = accountSlide.actions;

export default accountSlide.reducer;
