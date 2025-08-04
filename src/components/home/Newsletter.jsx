import { BsMailboxFlag } from "react-icons/bs";


export default function Newsletter() {
    return (
        <section className="py-20 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div 
                className="absolute inset-0 opacity-50"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
            ></div>
            
            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="text-center">
                    <div className="text-8xl mb-8 flex justify-center items-center text-primary-400">
                        <BsMailboxFlag />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                        Rimani Aggiornato
                    </h2>
                    <p className="text-xl text-neutral-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Iscriviti alla nostra newsletter per ricevere le ultime novità sui giochi, 
                        aggiornamenti della piattaforma e offerte esclusive
                    </p>
                    
                    <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
                        <input 
                            type="email" 
                            placeholder="La tua email"
                            className="flex-1 px-6 py-4 rounded-2xl border-2 border-neutral-600 bg-neutral-800 text-white placeholder-neutral-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                        />
                        <button className="px-8 py-4 bg-primary-600 text-white rounded-2xl font-semibold hover:bg-primary-700 transition-all duration-300 hover:scale-105 transform shadow-lg hover:shadow-xl">
                            Iscriviti
                        </button>
                    </div>
                    
                    <p className="text-sm mt-6 text-neutral-400 flex items-center justify-center gap-2">
                        <BsMailboxFlag className="text-primary-400" /> 
                        Non invieremo spam. Puoi disiscriverti in qualsiasi momento.
                    </p>
                </div>
            </div>
        </section>
    );
} 