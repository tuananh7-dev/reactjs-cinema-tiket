import { createAsyncThunk } from "@reduxjs/toolkit";

import callApi from "../../configs/axios.config";
import linkApi from "../../configs/link-api.config";

// Loc film đang chiếu
export const filterFilmIsReleasedThunk = createAsyncThunk("film/filterFilmIsReleasedThunk", async (filter) => {
    let limit = 20;
    const isReleased = 1;

    if (filter) {
        limit = filter.limit;
    }

    const res = await callApi.get(`${linkApi.filter_film}?limit=${limit}&isReleased=${isReleased}`).catch((error) => {
        return [];
    });
    return res.data;
});

// Loc film sắp chiếu
export const filterFilmIsCommingThunk = createAsyncThunk("film/filterFilmIsCommingThunk", async (filter) => {
    let limit = 20;
    const isReleased = 0;

    if (filter) {
        limit = filter.limit;
    }

    const res = await callApi.get(`${linkApi.filter_film}?limit=${limit}&isReleased=${isReleased}`).catch((error) => {
        return [];
    });

    return res.data;
});

// Loc film hiển thị ở banner
export const filterFilmBannerThunk = createAsyncThunk("film/filterFilmBannerThunk", async (filter) => {
    const res = await callApi.get(`${linkApi.filter_film_banner}`).catch((error) => {
        return [];
    });

    return res.data;
});
