import { Link } from "react-router-dom";
import "./button.styles.css";

function Button({ type, className, icon, content, onClick, contentStyle = "" }) {
    let btnClass = "btn-default ";
    switch (type) {
        case "icon":
            btnClass += "btn-icon";
            break;
        default:
            btnClass += "btn-basic";
            break;
    }
    return (
        <button className={btnClass + " " + (className || "")} onClick={onClick}>
            {type === "icon" && icon ? <img src={icon} alt="icon" className="btn-default-icon" /> : ""}
            <span className={`btn-default-content ${contentStyle}`}>{content}</span>
        </button>
    );
}

export default Button;
