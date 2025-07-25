import { Link } from "react-router-dom";

export default function ButtonUI({text, link}) {
    return (

        <Link to={link}>
        <button className="buttonUI"> 
            <p>{text}</p>
        </button>
        </Link>
    );
}