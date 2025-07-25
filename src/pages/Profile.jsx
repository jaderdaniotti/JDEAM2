import React from "react";

export default function Profile() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-chiaro text-scuro">
      <div className="bg-bianco p-8 rounded-2xl shadow-lg w-full max-w-2xl ">
        <h2 className="text-3xl font-bold mb-6 text-center">Area Personale</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-chiaro-2 flex items-center justify-center text-5xl text-scuro mb-4">
              <i className="bi bi-person-circle"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Mario Rossi</h3>
            <p className="text-sm text-scuro-2 mb-4">mario.rossi@email.com</p>
            <button className="buttonUI"><p>Modifica Profilo</p></button>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold mb-2">Giochi Preferiti</h4>
            <ul className="list-disc pl-5 mb-4">
              <li>The Witcher 3</li>
              <li>FIFA 23</li>
              <li>Among Us</li>
            </ul>
            <h4 className="text-lg font-bold mb-2">Impostazioni Account</h4>
            <button className="buttonUI"><p>Logout</p></button>
          </div>
        </div>
      </div>
    </section>
  );
} 