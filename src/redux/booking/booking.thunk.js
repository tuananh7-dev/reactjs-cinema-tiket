import { createAsyncThunk } from "@reduxjs/toolkit";

import callApi from "../../configs/axios.config";
import linkApi from "../../configs/link-api.config";

// Lay thong tin lich chieu theo id film
export const getShowTimeByFilmIdThunk = createAsyncThunk("booking/getShowTimeByFilmIdThunk", async (id) => {
    const res = await callApi.get(`${linkApi.get_show_time_by_film_id}/${id}`);
    console.log("🚀 ~ getShowTimeByFilmIdThunk ~ res:", res);
    if (res.status == 200) {
        return res.data[0];
    }
    return null;
});

// Lay thong tin cau truc phong
export const getRoomStructureThunk = createAsyncThunk("booking/getRoomStructureThunk", async (id) => {
    const res = await callApi.get(`${linkApi.get_room_structure}/${id}`);
    if (res.status == 200) {
        return res.data[0];
    }
    return null;
});

// Tao ma QR
export const genQRCodeThunk = createAsyncThunk(
    "booking/genQRCodeThunk",
    async ({ showTimeId, timeId, seatSelected }) => {
        const res = await callApi.post(`${linkApi.gen_qr_code}`, { showTimeId, timeId, seatSelected });
        if (res.status == 200) {
            return res.data[0];
        }
        return null;
    }
);
