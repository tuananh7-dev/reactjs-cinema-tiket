const linkApi = {
    base_url: import.meta.env?.BACKEND_ENV === "production" ? import.meta.env.BACKEND_ENV : "http://localhost:3000",

    filter_film: "/api/film/filter-film",
    filter_film_banner: "/api/film/filter-film-banner",
    get_film_by_id: "/api/film/get-film-by-id",
    get_random_film_released: "/api/film/get-random-film-released",
    register: "/api/auth/register",
    login: "/api/auth/login",
    get_me: "/api/auth/get-me",
    get_show_time_by_film_id: "/api/booking/get-show-time-by-film",
    get_room_structure: "/api/booking/get-room-structure",
    gen_qr_code: "/api/booking/gen-qr-code",
};

export default linkApi;
