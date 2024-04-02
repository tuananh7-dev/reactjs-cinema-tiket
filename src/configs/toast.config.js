import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const config = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
};

export function toastSuccess(message) {
    toast.success(message, config);
}

export function toastError(message) {
    toast.error(message, config);
}

export function toastWarning(message) {
    toast.warning(message, config);
}
