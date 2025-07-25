import React, { useState, useEffect } from "react";
import CardGames from "../CardGames";
import Loader from "../loader";
import { useGameFilter } from "../../context/GameFilterContext";

export default function Games() {
    const { selectedGenre } = useGameFilter();
    const [games, setGames] = useState();

    const getGames = async () => {

        const promise = await fetch("https://api.rawg.io/api/games?key=fe79071ec2d64d9a8864d79740169bfd&dates=2024-01-01,2024-12-31&page=1");
        const json = await promise.json();
        setGames(json);
    }

    useEffect(() => {
        getGames();
    }, [selectedGenre]);

    const filteredGames = games?.results?.filter(game => {
        if (!selectedGenre || selectedGenre === "allGenre") return true;
        return game.genres?.some(g => g.name === selectedGenre);
    });

    return (
        <div className="p-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 mx-auto">
            {filteredGames ? (
                filteredGames.map((game) => (
                    <CardGames key={game.id} title={game.name} image={game.background_image} genre={game.genres[0]?.name || ""} released={game.released} />
                ))
            ) : (
                <Loader />
            )}
            {Array.isArray(filteredGames) && filteredGames.length === 0 && (
                <div className="col-span-full h-100 flex justify-center items-center text-5xl text-center py-10">
                    <div className="notfound"></div>
                </div>
            )}
            <div className="join">
                <button className="join-item btn">«</button>
                <button className="join-item btn">Page 22</button>
                <button className="join-item btn">»</button>
            </div>
        </div>
    );
}