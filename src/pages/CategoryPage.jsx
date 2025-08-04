import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ButtonNormal from "../components/buttons/ButtonNormal";
import CardGames from "../components/CardGames";

export default function CategoryPage() {
    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);

                const categoryResponse = await fetch(`https://api.rawg.io/api/genres/${categoryId}?key=fe79071ec2d64d9a8864d79740169bfd`);
                if (!categoryResponse.ok) {
                    throw new Error('Categoria non trovata');
                }
                const categoryData = await categoryResponse.json();
                setCategory(categoryData);
                console.log('Category data:', categoryData);

                if (categoryData.slug) {

                    const gamesResponse = await fetch(`https://api.rawg.io/api/games?key=fe79071ec2d64d9a8864d79740169bfd&genres=${categoryData.slug}`);
                    if (!gamesResponse.ok) {
                        throw new Error('Errore nel caricamento dei giochi');
                    }
                    const gamesData = await gamesResponse.json();
                    setGames(gamesData.results || []);
                    console.log('Games data:', gamesData);
                }
            } catch (error) {
                console.error('Errore nel caricamento dei dati:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [categoryId]);

    if (loading) {
        return (
            <section className="min-h-screen bg-chiaro-2 text-scuro py-8">
                <div className="max-w-6xl mx-auto px-5">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-scuro mx-auto mb-4"></div>
                        <p>Caricamento categoria...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="min-h-screen bg-chiaro-2 text-scuro py-8">
                <div className="max-w-6xl mx-auto px-5">
                    <div className="text-center">
                        <div className="text-6xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold mb-4">Errore nel caricamento</h2>
                        <p className="text-scuro-2 mb-6">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-scuro text-chiaro px-6 py-3 rounded-lg hover:bg-scuro-2 transition-colors"
                        >
                            Riprova
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    if (!category) {
        return (
            <section className="min-h-screen bg-chiaro-2 text-scuro py-8">
                <div className="max-w-6xl mx-auto px-5">
                    <div className="text-center">
                        <div className="text-6xl mb-4">❌</div>
                        <h2 className="text-2xl font-bold mb-4">Categoria non trovata</h2>
                        <p className="text-scuro-2">La categoria richiesta non esiste.</p>
                    </div>
                </div>
            </section>
        );
    }


    return (
        <section className="min-h-screen bg-chiaro-2 text-scuro py-8">
            <div className="max-w-6xl mx-auto px-5">
                {/* Header Categoria */}
                <div className="mb-8">
                    <div className="bg-bianco rounded-2xl shadow-lg overflow-hidden">
                        <div className="relative h-max">
                            <img
                                src={category.image_background}
                                alt={category.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 bg-black/70 w-full p-6 text-chiaro">
                                <h1 className="text-4xl md:text-5xl font-bold mb-2">{category.name}</h1>
                               
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistiche Categoria */}
                <div className="bg-bianco rounded-2xl shadow-lg p-6 mb-8">
                    <h3 className="text-2xl font-bold mb-4">Statistiche {category.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-scuro mb-2">{games.length}</div>
                            <div className="text-scuro-2">Giochi Totali</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-scuro mb-2">
                                {games.length > 0 ? (games.reduce((acc, game) => acc + (game.rating || 0), 0) / games.length).toFixed(1) : '0.0'}
                            </div>
                            <div className="text-scuro-2">Rating Medio</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-scuro mb-2">
                                {games.filter(game => game.rating >= 4.5).length}
                            </div>
                            <div className="text-scuro-2">Giochi Top</div>
                        </div>
                    </div>
                </div>

                {/* Giochi della Categoria */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-6">Giochi in {category.name}</h2>

                    {games.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {games.map((game) => (
                                <CardGames key={game.id} id={game.id} title={game.name} image={game.background_image} genre={category.name} released={game.released} className="mx-auto"/>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🎮</div>
                            <h3 className="text-2xl font-bold mb-2">Nessun gioco trovato</h3>
                            <p className="text-scuro-2">Non ci sono ancora giochi in questa categoria.</p>
                        </div>
                    )}
                </div>


            </div>
        </section>
    );
} 