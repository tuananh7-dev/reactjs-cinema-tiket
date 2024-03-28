import "./film-item.styles.css";

function FilmItem({ thumbnail, name, onClick }) {
    return <img className="film-item-default" src={thumbnail} alt={name} title={name} onClick={onClick} />;
}

export default FilmItem;
