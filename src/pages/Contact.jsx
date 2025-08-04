import React from "react";
import ButtonNormal from "../components/buttons/ButtonNormal";

export default function Contact() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-soft w-full max-w-2xl border border-neutral-200">
        <h2 className="text-3xl font-display font-bold mb-6 text-center text-neutral-900">Contattaci</h2>
        <form className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Nome" 
            className="px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200" 
          />
          <input 
            type="email" 
            placeholder="Email" 
            className="px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200" 
          />
          <textarea 
            placeholder="Messaggio" 
            className="px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 min-h-[120px] resize-none" 
          />
          <button 
            type="submit" 
            className="bg-primary-600 text-white font-semibold w-max mx-auto px-10 py-3 rounded-xl hover:bg-primary-700 transition-all duration-300 hover:shadow-lg"
          >
            Invia
          </button>
        </form>
      </div>
    </section>
  );
} 