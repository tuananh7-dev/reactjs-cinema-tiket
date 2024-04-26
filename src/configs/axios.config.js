import axios from "axios";

import linkApi from "./link-api.config";
import { toastError } from "./toast.config";

// Config axios with token
const callApiWithToken = axios.create({
    baseURL: linkApi.base_url,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    },
});

callApiWithToken.interceptors.request.use(
    function (config) {
        config.headers.Authorization = "Bearer " + localStorage.getItem("token") || "";
        const { method, baseURL, url, params, data } = config;
        console.log("🚀 ~ Axios Request:", { method, baseURL, url, params, data });
        return config;
    },
    function (error) {
        console.log("🚀 ~ Axios request error:", error);
        return Promise.reject(error);
    }
);

callApiWithToken.interceptors.response.use(
    function (response) {
        return { data: response.data?.data, status: response.status };
    },
    async function (error) {
        console.log("🚀 ~ Axios response error:", error.response);
        const result = error.response;
        if (result.status === 403 || result.status === 401) {
            window.location.href = "/dang-nhap";
        }
        return result;
    }
);

// Config axios without token
const callApiNotToken = axios.create({
    baseURL: linkApi.base_url,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    },
});

callApiNotToken.interceptors.response.use(
    function (response) {
        return { data: response.data?.data, status: response.status };
    },
    async function (error) {
        console.log("🚀 ~ Axios response error:", error.response);
        const result = error.response;
        toastError(result.data.message);
        return result;
    }
);

export { callApiNotToken };
export default callApiWithToken;
