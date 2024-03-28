const linkApi = {
    base_url: import.meta.env?.BACKEND_ENV === "production" ? import.meta.env.BACKEND_ENV : "http://localhost:3000",

    filter_film: "/film/filter-film",
    filter_film_banner: "/film/filter-film-banner",
    get_film_by_id: "/film/get-film-by-id",
    get_random_film_released: "/film/get-random-film-released",
};

export default linkApi;
