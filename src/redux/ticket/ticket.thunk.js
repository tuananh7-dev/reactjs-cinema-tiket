import { createAsyncThunk } from "@reduxjs/toolkit";

import callApi from "../../configs/axios.config";
import linkApi from "../../configs/link-api.config";

export const getMyTicketThunk = createAsyncThunk("ticket/getMyTicketThunk", async () => {
    const result = await callApi.get(`${linkApi.get_my_ticket}`);
    if (result.status == 200) {
        return res.data;
    }
});
