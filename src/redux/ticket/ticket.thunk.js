import { createAsyncThunk } from "@reduxjs/toolkit";

import callApi from "../../configs/axios.config";
import linkApi from "../../configs/link-api.config";

export const getMyTicketThunk = createAsyncThunk("ticket/getMyTicketThunk", async () => {
    const res = await callApi.get(`${linkApi.get_my_ticket}`);
    if (res.status === 403 || res.status === 401) {
        window.location.href = "/dang-nhap";
    }
    return res.data;
});
