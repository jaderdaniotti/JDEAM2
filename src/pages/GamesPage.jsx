import FilterGames from "../components/games/FilterGames";
import Games from "../components/games/Games";
import { GameFilterProvider } from "../context/GameFilterContext";

export default function GamesPage() {

  return (
    <GameFilterProvider>
      <section className="min-h-screen bg-scuro text-chiaro py-10">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center">Tutti i Giochi</h2>
          <div className="flex items-center px-5 mb-5">
            {/* da vedere searchbar */}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-10 gap-5">
            <div className="col-span-full px-5 sm:col-span-4 md:col-span-4 lg:col-span-3 flex flex-col gap-2">
              <div className="w-full px-2 py-5 bg-scuro text-chiaro border-1 border-chiaro rounded-xl gap-2">
                <FilterGames />
              </div>
            </div>
            <div className="col-span-full sm:col-span-6 md:col-span-6 lg:col-span-7 mx-auto">
              <Games />
            </div>
          </div>
        </div>
      </section>
    </GameFilterProvider>
  );
} 