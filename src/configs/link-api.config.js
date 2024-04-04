const linkApi = {
    base_url: import.meta.env?.BACKEND_ENV === "production" ? import.meta.env.BACKEND_ENV : "http://localhost:3000",

    filter_film: "/api/film/filter-film",
    filter_film_banner: "/api/film/filter-film-banner",
    get_film_by_id: "/api/film/get-film-by-id",
    get_random_film_released: "/api/film/get-random-film-released",
    register: "/api/auth/register",
    login: "/api/auth/login",
    get_me: "/api/auth/get-me",
};

export default linkApi;
