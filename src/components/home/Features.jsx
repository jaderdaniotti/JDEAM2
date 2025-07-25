import ButtonUI from "../buttons/ButtonUI";
import { IoGameController } from "react-icons/io5";
import { GiElectricalResistance } from "react-icons/gi";
import { FaSearchengin } from "react-icons/fa6";
import { TbDeviceMobileHeart } from "react-icons/tb";

export default function Features() {

    const features = [
        {
            icon: <IoGameController />,
            title: "Gaming Experience",
            description: "Esplora una vasta collezione di giochi con recensioni dettagliate e classifiche aggiornate"
        },
        {
            icon: <GiElectricalResistance />,
            title: "Performance Ottimizzata",
            description: "Interfaccia veloce e reattiva costruita con React e Tailwind CSS"
        },
        {
            icon: <FaSearchengin />,
            title: "Ricerca Avanzata",
            description: "Trova facilmente i giochi che ti interessano con filtri e categorie"
        },
        {
            icon: <TbDeviceMobileHeart />,
            title: "Design Responsive",
            description: "Perfetto su desktop, tablet e mobile con un'esperienza ottimizzata"
        }
    ];

    return (
        <section className="py-16 bg-scuro-2 text-chiaro">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-bianco mb-4">
                        Caratteristiche Principali
                    </h2>
                    <p className="text-lg text-chiaro max-w-2xl mx-auto">
                        Scopri cosa rende JDeam2 un'esperienza di gaming unica e moderna
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className="bg-scuro p-6 rounded-2xl border-2 border-transparent hover:border-chiaro transition-all duration-300 hover:scale-105 group"
                        >
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center text-chiaro">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-bianco mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-chiaro text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
                
                <div className="text-center flex items-center justify-center mt-12">
                    <ButtonUI text="Scopri di Più" />
                </div>
            </div>
        </section>
    );
} 