import { createAsyncThunk } from "@reduxjs/toolkit";

import { toastError } from "../../configs/toast.config";
import linkApi from "../../configs/link-api.config";
import callApi from "../../configs/axios.config";
import { callApiNotToken } from "../../configs/axios.config";

export const registerThunk = createAsyncThunk("account/registerThunk", async ({ username, password }) => {
    const result = await callApiNotToken.post(`${linkApi.register}`, {
        username,
        password,
    });
    if (result.status == 200) {
        localStorage.setItem("token", result.data.token);
        window.location.href = "/";
        return;
    }
});

export const loginThunk = createAsyncThunk("account/registerThunk", async ({ username, password }) => {
    const result = await callApiNotToken.post(`${linkApi.login}`, {
        username,
        password,
    });
    if (result.status == 200) {
        localStorage.setItem("token", result.data.token);
        window.location.href = "/";
    }
    return;
});

export const getMeThunk = createAsyncThunk("account/getMeThunk", async () => {
    if (!localStorage.getItem("token")) {
        return null;
    }
    const result = await callApi.get(`${linkApi.get_me}`);
    if (result.status == 200) {
        return result.data;
    }
    return;
});
