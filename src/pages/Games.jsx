import React, { useState, useEffect } from "react";
import CardGames from "../components/CardGames";
import { BiCategoryAlt } from "react-icons/bi";

export default function Games() {
  const [games, setGames] = useState();
  const [genres, setGenres] = useState();
  const [selectedGenre, setSelectedGenre] = useState("");

  const getGames = async () => {
    const promise = await fetch("https://api.rawg.io/api/games?key=fe79071ec2d64d9a8864d79740169bfd&dates=2024-01-01,2024-12-31&page=1");
    const json = await promise.json();
    setGames(json);
    console.log(json);
  }
  const getGenres = async () => {
    const promise = await fetch("https://api.rawg.io/api/genres?key=fe79071ec2d64d9a8864d79740169bfd");
    const json = await promise.json();
    setGenres(json);
    console.log(json);
  }
  useEffect(() => {
    getGames();
    getGenres();
  }, []);

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
  };

  return (
    <section className="min-h-screen bg-scuro text-chiaro py-10">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center">Tutti i Giochi</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="col-span-full md:col-span-1 flex flex-col gap-2">
            <div className="w-full px-2 py-5 bg-scuro text-chiaro border-2 border-chiaro rounded-xl gap-2">
              <h3 className="text-2xl font-bold flex gap-2 justify-center items-center"><BiCategoryAlt className="w-10 h-10" />Categorie</h3>
              <div className="p-3">
              <ul className=" grid grid-cols-2 md:grid-cols-1 gap-2 dropdown-content bg-scuro-2  rounded-box z-1 w-full p-2 shadow-sm">
                {genres && genres.results ? (
                  genres.results.map((genre) => (
                    <li key={genre.id} className="flex flex-row gap-2 items-center ">
                      <input 
                        type="radio" 
                        name="genre" 
                        id={`genre-${genre.id}`}
                        value={genre.id}
                        checked={selectedGenre === genre.id}
                        onChange={() => handleGenreChange(genre.id)}
                        className="radio radio-sm"  
                      />
                      <label htmlFor={`genre-${genre.id}`} className="text-sm font-medium">{genre.name}</label>
                    </li>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">Caricamento generi...</div>
                )}
              </ul>
              </div>
            </div>
          </div>
          <div className="col-span-full md:col-span-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 mx-auto">
            {games && games.results ? (
              games.results.map((game) => (
                <CardGames key={game.id} title={game.name} image={game.background_image} genre={game.genres[0]?.name || ""} released={game.released} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">Caricamento giochi...</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 