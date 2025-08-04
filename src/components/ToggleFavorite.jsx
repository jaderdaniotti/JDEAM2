import { MdFavorite, MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { useContext } from "react";
import FavoritesContext from "../context/FavoritesContext";

export default function ToggleFavorite({ gameId, gameData = null }) {
    const { favorites, addFavorites, removeFavorite } = useContext(FavoritesContext);
    const isFavorite = favorites.some((favorite) => favorite.game_id === gameId);
    const handleClick = () => {
        if (isFavorite) {
            removeFavorite(gameId);
        } else {
            addFavorites(gameId, gameData);
        }
    }


    return (
        <button className="text-2xl border-3 border-primary-600 rounded-tr-2xl p-2 hover:scale-110 transition-all duration-300" onClick={handleClick}>
            {isFavorite ? <MdFavorite className="text-red-500" /> : <MdOutlineFavorite className="text-gray-400" />}
        </button>
    )
}