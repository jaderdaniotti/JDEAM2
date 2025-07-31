import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

export default function SearchBar() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const getGamesBySearch = async (searchTerm) => {
        if (!searchTerm.trim()) {
            setGames([]);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `https://api.rawg.io/api/games?key=fe79071ec2d64d9a8864d79740169bfd&search=${encodeURIComponent(searchTerm)}&page_size=10`
            );
            const data = await response.json();
            setGames(data.results || []);
        } catch (error) {
            console.error("Errore durante la ricerca:", error);
            setGames([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (search.trim()) {
                getGamesBySearch(search);
                setShowResults(true);
            } else {
                setGames([]);
                setShowResults(false);
            }
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [search]);

    const handleSearch = (event) => {
        event.preventDefault();
        if (typeof search === 'string' && search.trim().length !== 0) {
            navigate(`/search?query=${encodeURIComponent(search)}`);
            setSearch("");
            setShowResults(false);
        }
    };

    const handleInputChange = (event) => {
        setSearch(event.target.value);
    };

    const handleGameClick = (game) => {
        navigate(`/game/${game.id}`);
        setSearch("");
        setShowResults(false);
    };

    const handleClickOutside = () => {
        setShowResults(false);
    };

    return (
        <>
            <form onSubmit={handleSearch} className="w-full px-5 py-3 relative">
                <label className="input bg-scuro-2 text-chiaro w-full">
                    <input 
                        type="search" 
                        className="grow flex text-chiaro items-center" 
                        placeholder="Cerca giochi..."
                        value={search}
                        onChange={handleInputChange}
                        onFocus={() => setShowResults(true)}
                    />
                    <button 
                        type="submit"
                        className="btn absolute right-0  m-auto bg-scuro shadow-none border-none btn-sm text-chiaro"
                    >
                        <CiSearch />
                    </button>
                </label>

                {/* Risultati della ricerca */}
                {showResults && (
                    <div className="absolute top-full left-0 right-0 z-50 bg-slate-800 border border-slate-600 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                        {loading ? (
                            <div className="p-4 text-center text-chiaro">
                                <div className="loading loading-spinner loading-md"></div>
                                <p className="mt-2">Ricerca in corso...</p>
                            </div>
                        ) : games.length > 0 ? (
                            <div className="py-2">
                                {games.map((game) => (
                                    <div
                                        key={game.id}
                                        className="px-4 py-3 hover:bg-slate-700 cursor-pointer transition-colors"
                                        onClick={() => handleGameClick(game)}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={game.background_image || game.image_background}
                                                alt={game.name}
                                                className="w-12 h-12 object-cover rounded"
                                                onError={(e) => {
                                                    e.target.src = '/public/immagini/sfondo.png';
                                                }}
                                            />
                                            <div className="flex-1">
                                                <h3 className="text-chiaro font-medium">{game.name}</h3>
                                                <p className="text-slate-400 text-sm">
                                                    {game.released ? new Date(game.released).getFullYear() : 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : search.trim() && !loading ? (
                            <div className="p-4 text-center text-slate-400">
                                Nessun gioco trovato per "{search}"
                            </div>
                        ) : null}
                    </div>
                )}
            </form>

            {/* Overlay per chiudere i risultati quando si clicca fuori */}
            {showResults && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={handleClickOutside}
                />
            )}
        </>
    );
}