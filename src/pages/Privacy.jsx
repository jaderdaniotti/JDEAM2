import React from "react";

export default function Privacy() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 py-5">
      <div className="bg-white p-8 rounded-2xl shadow-soft w-full max-w-xl border border-neutral-200">
        <h2 className="text-3xl font-display font-bold mb-6 text-center text-neutral-900">Privacy Policy</h2>
        <p className="mb-4 text-neutral-600 leading-relaxed">Questa è una privacy policy di esempio. Qui verranno spiegate le modalità di raccolta, utilizzo e protezione dei dati personali degli utenti.</p>
        <p className="text-neutral-600 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, nec dictum urna quam at urna.</p>
      </div>
    </section>
  );
} 