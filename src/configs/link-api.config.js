const linkApi = {
    base_url: import.meta.env?.BACKEND_ENV === "production" ? import.meta.env.BACKEND_ENV : "http://localhost:3000",

    filter_film: "/film/filter-film",
    filter_film_banner: "/film/filter-film-banner",
};

export default linkApi;
