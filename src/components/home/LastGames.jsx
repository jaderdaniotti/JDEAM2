import { useEffect, useState } from "react";
import ButtonUI from "../buttons/ButtonUI";
import CardGames from "../CardGames";
//fe79071ec2d64d9a8864d79740169bfd
export default function LastGames() {
     const [lastGames, setLastGames] = useState();
     const getLastGames = async () => {
         const promise = await fetch("https://api.rawg.io/api/games?key=fe79071ec2d64d9a8864d79740169bfd&dates=2024-01-01,2024-12-31&page=1");
         const json = await promise.json();
         setLastGames(json);
     }
     useEffect(() => {
         getLastGames();
     }, []);
    // const randomId = Math.floor(Math.random() * 1000);

    return (
        <section className="py-10 gap-2 text-chiaro bg-scuro-2 items-center justify-center text-center px-4">
            <div className="col-span-2 flex flex-col items-center justify-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Ultimi Giochi</h2>
                <p className="text-lg text-chiaro max-w-2xl mx-auto">
                        Ecco i giochi più recenti, sfoglia l'elenco per scoprire i titoli che ti aspettano!
                    </p>
                <div className="grid p-5">
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-6 ">
                        {lastGames && lastGames.results ? (
                            lastGames.results.map((game) => (
                                <CardGames key={game.id} id={game.id} title={game.name} image={game.background_image} genre={game.genres[0]?.name || ""} released={game.released} />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-bianco py-10">Caricamento giochi...</div>
                        )}
                    </div>
                    <div className="text-center flex items-center justify-center mt-12">
                        <ButtonUI link="/games" text="Vedi Tutti i Giochi" className="bg-scuro text-chiaro" />
                    </div>
                </div>
            </div>
        </section>
    );
}