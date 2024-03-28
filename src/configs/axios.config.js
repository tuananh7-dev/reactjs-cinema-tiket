import axios from "axios";

import linkApi from "./link-api.config";

const instance = axios.create({
    baseURL: linkApi.base_url + "/api",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    function (config) {
        const { method, baseURL, url, params } = config;
        console.log("🚀 ~ Axios Request:", { method, baseURL, url, params });
        return config;
    },
    function (error) {
        console.log("🚀 ~ axios request error:", error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        console.log("🚀 ~ axios response error:", error);
        return Promise.reject(error);
    }
);

export default instance;
