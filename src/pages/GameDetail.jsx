import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";
import ToggleFavorite from "../components/ToggleFavorite";
import Chatbox from "../components/chatbox";



export default function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const loadGame = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.rawg.io/api/games/${id}?key=fe79071ec2d64d9a8864d79740169bfd`);
      if (!response.ok) {
        throw new Error("Errore nel caricamento del gioco");
      }
      const data = await response.json();
      setGame(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGame();
  }, [id]);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-scuro text-chiaro">
        <Loader />
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-scuro text-chiaro">
        <div className="bg-bianco p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-scuro mb-4">Errore</h2>
          <p className="text-scuro-2">{error}</p>
        </div>
      </section>
    );
  }

  if (!game) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-scuro text-chiaro">
        <div className="bg-bianco p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-scuro mb-4">Gioco non trovato</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-scuro text-chiaro py-10">
      <div className="container mx-auto px-4">
        {/* Header del gioco */}
        <div className="bg-bianco rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-96">
            <img 
              src={game.background_image} 
              alt={game.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-scuro/80 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-bianco">
              <h1 className="text-4xl md:text-6xl font-bold mb-2">{game.name}</h1>
              <div className="flex items-center gap-4">
                {game.rating && (
                  <div className="flex items-center gap-2 bg-chiaro text-scuro px-3 py-1 rounded-full">
                    <span className="text-lg">⭐</span>
                    <span className="font-semibold">{game.rating}/5</span>
                  </div>
                )}
                {game.released && (
                  <div className="bg-scuro-2 text-bianco px-3 py-1 rounded-full">
                    {new Date(game.released).getFullYear()}
                  </div>
                )}
                {game.achievements_count > 0 && (
                  <div className="bg-chiaro-2 text-scuro px-3 py-1 rounded-full">
                    🏆 {game.achievements_count} Achievements
                  </div>
                )}
              </div>
            </div>
            <div className="absolute top-1 right-1">
              <ToggleFavorite gameId={game.id} gameData={game} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenuto principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Descrizione */}
            <div className="bg-bianco p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-scuro mb-4">Descrizione</h2>
              <div 
                className="text-scuro-2 leading-relaxed prose prose-scuro max-w-none"
                dangerouslySetInnerHTML={{ __html: game.description }}
              />
            </div>

            {/* Screenshot */}
            {game.short_screenshots && game.short_screenshots.length > 0 && (
              <div className="bg-bianco p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-scuro mb-4">Screenshot ({game.screenshots_count})</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {game.short_screenshots
                    .filter((s) => s.image && s.id !== -1)
                    .slice(0, 6)
                    .map((screenshot) => (
                      <img 
                        key={screenshot.id} 
                        src={screenshot.image} 
                        alt={`Screenshot di ${game.name}`}
                        className="w-full h-32 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                      />
                    ))}
                </div>
              </div>
            )}

            {/* Tag */}
            {game.tags && game.tags.length > 0 && (
              <div className="bg-bianco p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-scuro mb-4">Caratteristiche</h2>
                <div className="flex flex-wrap gap-2">
                  {game.tags.slice(0, 12).map((tag) => (
                    <span 
                      key={tag.id} 
                      className="bg-chiaro text-scuro px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements */}
            {game.platforms && game.platforms[0]?.requirements && (
              <div className="bg-bianco p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-scuro mb-4">Requisiti di Sistema</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {game.platforms[0].requirements.minimum && (
                    <div>
                      <h3 className="text-lg font-semibold text-scuro mb-2">Minimi</h3>
                      <pre className="text-sm text-scuro-2 whitespace-pre-wrap  p-3 rounded">
                        {game.platforms[0].requirements.minimum}
                      </pre>
                    </div>
                  )}
                  {game.platforms[0].requirements.recommended && (
                    <div>
                      <h3 className="text-lg font-semibold text-scuro mb-2">Raccomandati</h3>
                      <pre className="text-sm text-scuro-2 whitespace-pre-wrap  p-3 rounded">
                        {game.platforms[0].requirements.recommended}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}
                        {/* Rating dettagliati */}
                        {game.ratings && game.ratings.length > 0 && (
              <div className="bg-bianco p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-scuro mb-4">Valutazioni ({game.ratings_count})</h3>
                <div className="space-y-3">
                  {game.ratings.map((rating) => (
                    <div key={rating.id} className="flex items-center justify-between">
                      <span className="text-scuro-2 capitalize">{rating.title}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-scuro-2 rounded-full h-2">
                          <div 
                            className="bg-chiaro h-2 rounded-full" 
                            style={{ width: `${rating.percent}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-scuro-2 w-12">{rating.percent}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Store */}
            {game.stores && game.stores.length > 0 && (
              <div className="bg-bianco p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-scuro mb-4">Dove acquistare</h3>
                <div className="space-y-2">
                  {game.stores.map((store, index) => (
                    <div key={index} className="bg-scuro-2 text-bianco px-3 py-2 rounded">
                      {store.store.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
                         <Chatbox data={game} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informazioni principali */}
            <div className="bg-bianco p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-scuro mb-4">Informazioni</h3>
              
              {/* Generi */}
              {game.genres && game.genres.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-scuro mb-2">Generi</h4>
                  <div className="flex flex-wrap gap-2">
                    {game.genres.map((genre) => (
                      <span 
                        key={genre.id} 
                        className="bg-scuro-2 text-bianco px-2 py-1 rounded text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Piattaforme */}
              {game.platforms && game.platforms.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-scuro mb-2">Piattaforme</h4>
                  <div className="flex flex-wrap gap-2">
                    {game.platforms.map((platform, index) => (
                      <span 
                        key={index} 
                        className="bg-chiaro-2 text-scuro px-2 py-1 rounded text-sm"
                      >
                        {platform.platform.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Data di rilascio */}
              {game.released && (
                <div className="mb-4">
                  <h4 className="font-semibold text-scuro mb-2">Data di rilascio</h4>
                  <p className="text-scuro-2">{new Date(game.released).toLocaleDateString('it-IT')}</p>
                </div>
              )}

              {/* Rating ESRB */}
              {game.esrb_rating && (
                <div className="mb-4">
                  <h4 className="font-semibold text-scuro mb-2">Rating ESRB</h4>
                  <span className="bg-scuro text-bianco px-2 py-1 rounded text-sm">
                    {game.esrb_rating.name}
                  </span>
                </div>
              )}

              {/* Tempo di gioco */}
              {game.playtime && (
                <div className="mb-4">
                  <h4 className="font-semibold text-scuro mb-2">Tempo di gioco medio</h4>
                  <p className="text-scuro-2">{game.playtime} ore</p>
                </div>
              )}

              {/* Metacritic */}
              {game.metacritic && (
                <div className="mb-4">
                  <h4 className="font-semibold text-scuro mb-2">Metacritic</h4>
                  <a 
                    href={game.metacritic_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-chiaro text-scuro px-2 py-1 rounded text-sm hover:bg-chiaro-2 transition-colors"
                  >
                    {game.metacritic}/100
                  </a>
                </div>
              )}

              {/* Website */}
              {game.website && (
                <div className="mb-4">
                  <h4 className="font-semibold text-scuro mb-2">Sito Ufficiale</h4>
                  <a 
                    href={game.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-scuro font-medium"
                  >
                    {game.website}
                  </a>
                </div>
              )}
            </div>

            {/* Developers & Publishers */}
            {(game.developers || game.publishers) && (
              <div className="bg-bianco p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-scuro mb-4">Sviluppo</h3>
                
                {game.developers && game.developers.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-scuro mb-2">Sviluppatori</h4>
                    <div className="space-y-2">
                      {game.developers.map((dev) => (
                        <div key={dev.id} className="bg-scuro-2 text-bianco px-3 py-2 rounded">
                          {dev.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {game.publishers && game.publishers.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-scuro mb-2">Editori</h4>
                    <div className="space-y-2">
                      {game.publishers.map((pub) => (
                        <div key={pub.id} className="bg-chiaro-2 text-scuro px-3 py-2 rounded">
                          {pub.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}



            {/* Statistiche */}
            <div className="bg-bianco p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-scuro mb-4">Statistiche</h3>
              <div className="space-y-3">
                {game.added && (
                  <div className="flex justify-between">
                    <span className="text-scuro-2">Aggiunto da</span>
                    <span className="font-semibold text-scuro">{game.added.toLocaleString()} utenti</span>
                  </div>
                )}
                {game.reviews_count > 0 && (
                  <div className="flex justify-between">
                    <span className="text-scuro-2">Recensioni</span>
                    <span className="font-semibold text-scuro">{game.reviews_count}</span>
                  </div>
                )}
                {game.suggestions_count > 0 && (
                  <div className="flex justify-between">
                    <span className="text-scuro-2">Suggerimenti</span>
                    <span className="font-semibold text-scuro">{game.suggestions_count}</span>
                  </div>
                )}
                {game.reddit_count > 0 && (
                  <div className="flex justify-between">
                    <span className="text-scuro-2">Reddit</span>
                    <span className="font-semibold text-scuro">{game.reddit_count.toLocaleString()}</span>
                  </div>
                )}
                {game.youtube_count > 0 && (
                  <div className="flex justify-between">
                    <span className="text-scuro-2">YouTube</span>
                    <span className="font-semibold text-scuro">{game.youtube_count.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

                         {/* Status utenti */}
             {game.added_by_status && (
               <div className="bg-bianco p-6 rounded-2xl shadow-lg">
                 <h3 className="text-xl font-bold text-scuro mb-4">Status Utenti</h3>
                 <div className="space-y-2">
                   {Object.entries(game.added_by_status).map(([status, count]) => (
                     <div key={status} className="flex justify-between">
                       <span className="text-scuro-2 capitalize">{status}</span>
                       <span className="font-semibold text-scuro">{count.toLocaleString()}</span>
                     </div>
                   ))}
                 </div>
               </div>
             )}
           </div>
         </div>
       </div>
     </section>
   );
 } 