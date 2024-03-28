import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";

import "./trailer-modal.styles.css";
import { setPlayTrailer } from "../../redux/film/film.slice";

Modal.setAppElement("#root");
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

function TrailerModal() {
    const dispatch = useDispatch();
    const { playTrailer } = useSelector((state) => state.film);

    const closeModal = () => {
        dispatch(setPlayTrailer(""));
    };

    return (
        <Modal
            isOpen={playTrailer ? true : false}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <iframe
                width="900"
                height="500"
                src={`https://www.youtube.com/embed/${playTrailer}?autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </Modal>
    );
}

export default TrailerModal;
