export const getShortDay = (date) => {
    var days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const dateTemp = new Date(date);
    return days[dateTemp.getDay()];
};

export const getDate = (date) => {
    const dateTemp = new Date(date);
    return dateTemp.getDate();
};

export const formatDate = (string) => {
    const date = new Date(string);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

export const calcTimeEndFilm = (timeStart, during) => {
    const timeStartSplit = timeStart.split(":");
    const hourStart = timeStartSplit[0];
    const minuteStart = timeStartSplit[1];
    const date = new Date();
    date.setHours(hourStart, minuteStart);
    date.setMinutes(date.getMinutes() + during);
    return date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0");
};
