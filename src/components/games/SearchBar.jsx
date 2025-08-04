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
            <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto px-4 py-4 relative">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <CiSearch className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input 
                        type="search" 
                        className="block w-full pl-12 pr-12 py-4 bg-white border border-neutral-300 rounded-2xl text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-soft transition-all duration-200" 
                        placeholder="Cerca giochi..."
                        value={search}
                        onChange={handleInputChange}
                        onFocus={() => setShowResults(true)}
                    />
                    <button 
                        type="submit"
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-primary-600 hover:text-primary-700 transition-colors duration-200"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>

                {/* Risultati della ricerca */}
                {showResults && (
                    <div className="absolute top-full left-0 right-0 z-50 bg-white border border-neutral-200 rounded-2xl shadow-large max-h-96 overflow-y-auto mt-2">
                        {loading ? (
                            <div className="p-6 text-center text-neutral-600">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                                <p className="mt-3 font-medium">Ricerca in corso...</p>
                            </div>
                        ) : games.length > 0 ? (
                            <div className="py-2">
                                {games.map((game) => (
                                    <div
                                        key={game.id}
                                        className="px-6 py-4 hover:bg-neutral-50 cursor-pointer transition-colors duration-200 border-b border-neutral-100 last:border-b-0"
                                        onClick={() => handleGameClick(game)}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={game.background_image || game.image_background}
                                                alt={game.name}
                                                className="w-14 h-14 object-cover rounded-xl shadow-soft"
                                                onError={(e) => {
                                                    e.target.src = '/public/immagini/sfondo.png';
                                                }}
                                            />
                                            <div className="flex-1">
                                                <h3 className="text-neutral-900 font-semibold text-lg">{game.name}</h3>
                                                <p className="text-neutral-500 text-sm">
                                                    {game.released ? new Date(game.released).getFullYear() : 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : search.trim() && !loading ? (
                            <div className="p-6 text-center text-neutral-500">
                                <p className="font-medium">Nessun gioco trovato per "{search}"</p>
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