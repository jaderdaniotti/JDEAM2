import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ButtonNormal({ link, text, bg, color }) {
    const navigate = useNavigate();
    return (
        <>
        <button onClick={() => navigate(link)} className={`${bg} ${color} px-4 py-2 rounded-md`}>{text}</button>
        </>
    )
}