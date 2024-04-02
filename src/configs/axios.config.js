import axios from "axios";

import linkApi from "./link-api.config";

const instance = axios.create({
    baseURL: linkApi.base_url,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    function (config) {
        const { method, baseURL, url, params, data } = config;
        console.log("🚀 ~ Axios Request:", { method, baseURL, url, params, data });
        return config;
    },
    function (error) {
        console.log("🚀 ~ Axios request error:", error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        return { data: response.data?.data, status: response.status };
    },
    async function (error) {
        console.log("🚀 ~ Axios response error:", error.response);
        return error.response;
    }
);

export default instance;
