import React, { useState, useEffect } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import Loader from "../loader";
import { useGameFilter } from "../../context/GameFilterContext";

export default function FilterGames() {
    const [genres, setGenres] = useState();
    const { selectedGenre, setSelectedGenre } = useGameFilter();

    const getGenres = async () => {
        const promise = await fetch("https://api.rawg.io/api/genres?key=fe79071ec2d64d9a8864d79740169bfd");
        const json = await promise.json();
        setGenres(json);
    }

    useEffect(() => {
        getGenres();
    }, []);

    const handleGenreChange = (genre) => {
        setSelectedGenre(genre);
    };

    return (
        <>
            <h3 className="text-2xl font-bold flex gap-2 justify-center items-center"><BiCategoryAlt className="w-10 h-10" />Categorie</h3>
            <div className="p-3">
                <ul className=" grid grid-cols-2 md:grid-cols-1 gap-2 dropdown-content bg-scuro-2  rounded-box z-1 w-full p-2 shadow-sm">
                    <li className="flex flex-row gap-2 items-center ">
                        <input
                            type="radio"
                            name="genre"
                            id="allGenre"
                            value=""
                            onChange={() => handleGenreChange("allGenre")}
                            className="radio radio-sm"
                            defaultChecked={selectedGenre === ""}
                        />
                        <label htmlFor="All genre" className="text-sm font-medium">Tutte le categorie</label>
                    </li>
                    {genres && genres.results ? (
                        genres.results.map((genre) => (
                            <li key={genre.id} className="flex flex-row gap-2 items-center ">
                                <input
                                    type="radio"
                                    name="genre"
                                    id={`genre-${genre.id}`}
                                    value={genre.name}
                                    checked={selectedGenre === genre.name}
                                    onChange={() => handleGenreChange(genre.name)}
                                    className="radio radio-sm"
                                />

                                <label htmlFor={`genre-${genre.id}`} className="text-sm font-medium">{genre.name}</label>
                            </li>
                        ))
                    ) : (
                        ""
                    )}
                </ul>
            </div>
        </>
    );
}