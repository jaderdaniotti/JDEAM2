import React from "react";
import ButtonNormal from "../components/buttons/ButtonNormal";

export default function Contact() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-scuro text-scuro py-10">
      <div className="bg-chiaro p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Contattaci</h2>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Nome" className="px-4 py-3 rounded-lg border border-scuro-2 focus:outline-none focus:border-chiaro" />
          <input type="email" placeholder="Email" className="px-4 py-3 rounded-lg border border-scuro-2 focus:outline-none focus:border-chiaro" />
          <textarea placeholder="Messaggio" className="px-4 py-3 rounded-lg border border-scuro-2 focus:outline-none focus:border-chiaro min-h-[120px]" />
          <button type="submit" className="bg-chiaro border-scuro border-2 text-scuro w-max mx-auto px-10 py-2 rounded-md "><p>Invia</p></button>
        </form>
      </div>
    </section>
  );
} 