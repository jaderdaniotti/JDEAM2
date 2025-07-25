import { BsMailboxFlag } from "react-icons/bs";


export default function Newsletter() {
    return (
        <section className="py-16 bg-chiaro-2 text-scuro">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="text-7xl mb-6 flex justify-center items-center "><BsMailboxFlag /></div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Rimani Aggiornato
                    </h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto">
                        Iscriviti alla nostra newsletter per ricevere le ultime novità sui giochi, 
                        aggiornamenti della piattaforma e offerte esclusive
                    </p>
                    
                    <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                        <input 
                            type="email" 
                            placeholder="La tua email"
                            className="flex-1 px-6 py-3 rounded-full border-2 border-scuro bg-bianco text-scuro placeholder-scuro focus:outline-none focus:border-chiaro transition-colors duration-300"
                        />
                        <button className="px-8 py-3 bg-scuro text-bianco rounded-full font-semibold hover:bg-scuro-2 transition-all duration-300 hover:scale-105 transform">
                            Iscriviti
                        </button>
                    </div>
                    
                    <p className="text-sm mt-4 text-scuro-2 flex items-center justify-center gap-1">
                    <BsMailboxFlag /> Non invieremo spam. Puoi disiscriverti in qualsiasi momento.
                    </p>
                </div>
            </div>
        </section>
    );
} 