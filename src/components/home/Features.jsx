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
        <section className="py-20 bg-gradient-to-br from-neutral-100 to-neutral-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-neutral-900 mb-6">
                        Caratteristiche Principali
                    </h2>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                        Scopri cosa rende JDeam2 un'esperienza di gaming unica e moderna
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-large transition-all duration-500 hover:translate-y-[-8px] group border border-neutral-200"
                        >
                            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center text-primary-600">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-neutral-900 mb-4 text-center">
                                {feature.title}
                            </h3>
                            <p className="text-neutral-600 text-base leading-relaxed text-center">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
                
                <div className="text-center">
                    <ButtonUI text="Scopri di Più" variant="outline" size="lg" />
                </div>
            </div>
        </section>
    );
} 