import React, { useState, useEffect } from "react";
import CardGames from "../CardGames";
import Loader from "../loader";
import { useGameFilter } from "../../context/GameFilterContext";

export default function Games() {
    const { selectedGenre } = useGameFilter();
    let [games, setGames] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const getGames = async () => {
        setGames(null);
        const promise = await fetch(`https://api.rawg.io/api/games?key=fe79071ec2d64d9a8864d79740169bfd&dates=2024-01-01,2024-12-31&page=${currentPage}`);
        const json = await promise.json();
        setGames(json);
    }

    useEffect(() => {
        setGames(null); 
        getGames();
      }, [selectedGenre, currentPage]);

    const filteredGames = games?.results?.filter(game => {
        if (!selectedGenre || selectedGenre === "allGenre") return true;
        return game.genres?.some(g => g.name === selectedGenre);
    });

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    return (
        <>

            <div className="px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 justify-center items-center ">
                {filteredGames ? (
                    filteredGames.map((game) => (
                        <CardGames key={game.id} id={game.id} title={game.name} image={game.background_image} genre={game.genres[0]?.name || ""} released={game.released} className="mx-auto"/>
                    ))
                ) : (
                    <div className="col-span-full h-screen flex justify-center items-center text-5xl text-center py-10">
                        <Loader />
                    </div>
                )}
                {Array.isArray(filteredGames) && filteredGames.length === 0 && (
                    <div className="col-span-full h-100 flex justify-center items-center text-5xl text-center py-10">
                        <div className="notfound"></div>
                    </div>
                )}
            </div>
            {filteredGames && (
                <div className="flex justify-center items-center mt-5 mx-auto w-full">
                    <div className="join">
                        <button className={`join-item btn ${games?.previous === null ? 'btn-disabled' : ''}`} onClick={() => handlePageChange(currentPage - 1)}>«</button>
                        <button className="join-item btn">{currentPage}</button>
                        <button className={`join-item btn ${games?.next === null ? 'btn-disabled' : ''}`} onClick={() => handlePageChange(currentPage + 1)}>»</button>
                    </div>
                </div>
            )}
        </>
    );
}