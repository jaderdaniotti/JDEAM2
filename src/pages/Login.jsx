import React from "react";

export default function Login() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-chiaro text-scuro">
      <div className="bg-chiaro p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Accedi</h2>
        <form className="flex flex-col gap-4">
          <input type="email" placeholder="Email" className="px-4 py-3 rounded-lg border border-scuro-2 focus:outline-none focus:border-chiaro" />
          <input type="password" placeholder="Password" className="px-4 py-3 rounded-lg border border-scuro-2 focus:outline-none focus:border-chiaro" />
          <button type="submit" className="bg-chiaro border-scuro border-2 text-scuro w-max mx-auto px-10 py-2 rounded-md  mt-2"><p>Login</p></button>
        </form>
        <p className="mt-4 text-center text-sm">Non hai un account? <a href="/register" className="text-chiaro font-semibold">Registrati</a></p>
      </div>
    </section>
  );
} 