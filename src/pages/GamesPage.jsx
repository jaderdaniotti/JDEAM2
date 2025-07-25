import FilterGames from "../components/games/FilterGames";
import Games from "../components/games/Games";
import { GameFilterProvider } from "../context/GameFilterContext";

export default function GamesPage() {

  return (
    <GameFilterProvider>
    <section className="min-h-screen bg-scuro text-chiaro py-10">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center">Tutti i Giochi</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="col-span-full md:col-span-1 flex flex-col gap-2">
            <div className="w-full px-2 py-5 bg-scuro text-chiaro border-2 border-chiaro rounded-xl gap-2">
              <FilterGames />
            </div>
          </div>
          <div className="col-span-full md:col-span-3">
            <Games />
          </div>
        </div>
      </div>
    </section>      
    </GameFilterProvider>
  );
} 