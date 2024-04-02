import { createAsyncThunk } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

import { toastError } from "../../configs/toast.config";
import linkApi from "../../configs/link-api.config";
import callApi from "../../configs/axios.config";

export const registerThunk = createAsyncThunk("account/registerThunk", async ({ username, password }) => {
    const result = await callApi.post(`${linkApi.register}`, {
        username,
        password,
    });

    if (result.status === 200) {
        localStorage.setItem("token", result.data.token);
        window.location.href = "/";
    } else {
        toastError(result.data.message);
    }
    return;
});

export const loginThunk = createAsyncThunk("account/registerThunk", async ({ username, password }) => {
    const result = await callApi.post(`${linkApi.login}`, {
        username,
        password,
    });

    if (result.status === 200) {
        localStorage.setItem("token", result.data.token);
        window.location.href = "/";
    } else {
        toastError(result.data.message);
    }
    return;
});
