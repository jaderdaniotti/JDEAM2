import { LiaStarSolid } from "react-icons/lia";



export default function Testimonials() {
    const testimonials = [
        {
            name: "Marco Rossi",
            role: "Gamer Appassionato",
            content: "JDeam2 ha rivoluzionato il modo in cui scopro nuovi giochi. L'interfaccia è incredibilmente intuitiva e veloce!",
            rating: 5,

        },
        {
            name: "Laura Bianchi",
            role: "Streamer",
            content: "Perfetto per la mia community! I miei follower adorano le recensioni dettagliate e le classifiche aggiornate.",
            rating: 5,

        },
        {
            name: "Alessandro Verdi",
            role: "Game Developer",
            content: "Come sviluppatore, apprezzo molto la qualità delle recensioni e la facilità di navigazione della piattaforma.",
            rating: 5,

        }
    ];


    function renderStars({ rating }) {
        return (
            <div className="flex gap-1">
                {Array.from({ length: rating }, (_, i) => (
                    <LiaStarSolid key={i} className="text-chiaro-2" />
                ))}
            </div>
        );
    }

    return (
        <section className="py-16 bg-scuro text-chiaro">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-bianco mb-4">
                        Cosa Dicono i Nostri Utenti
                    </h2>
                    <p className="text-lg text-chiaro max-w-2xl mx-auto">
                        La comunità JDeam2 è il nostro orgoglio. Ecco le loro esperienze
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-scuro-2 p-6 rounded-2xl border-2 border-transparent hover:border-chiaro transition-all duration-300 hover:scale-105"
                        >
                            <div className="flex items-center mb-4 gap-4">
                                <div className="avatar">
                                    <div className="w-10 rounded-full">
                                        <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-bianco">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-sm text-chiaro">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-4">
                                {renderStars({ rating: testimonial.rating })}
                            </div>

                            <p className="text-chiaro text-sm leading-relaxed italic">
                                "{testimonial.content}"
                            </p>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <div className="inline-flex items-center gap-2 bg-chiaro text-scuro px-6 py-3 rounded-full font-semibold">
                        <span>4.9/5</span>
                        <span>⭐</span>
                        <span>Basato su 1,234 recensioni</span>
                    </div>
                </div>
            </div>
        </section>
    );
} 