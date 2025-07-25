import React from "react";

export default function GameDetail() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-chiaro text-scuro py-10">
      <div className="bg-bianco p-8 rounded-2xl shadow-lg w-full max-w-3xl">
        <div className="flex flex-col md:flex-row gap-8">
          <img src="https://picsum.photos/seed/game/400/300" alt="Game" className="rounded-2xl w-full md:w-1/2 object-cover" />
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Cyberpunk 2077</h2>
              <p className="text-chiaro-2 mb-4">RPG | PC, PS5, Xbox</p>
              <p className="mb-6">Un gioco di ruolo open world ambientato in una metropoli futuristica. Esplora, combatti, personalizza il tuo personaggio e vivi una storia avvincente.</p>
            </div>
            <div className="flex gap-4 mt-4">
              <button className="buttonUI"><p>Aggiungi ai Preferiti</p></button>
              <button className="buttonUI"><p>Gioca Ora</p></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 