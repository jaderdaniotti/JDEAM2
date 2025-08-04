import { CgGames } from "react-icons/cg";
import { FaUsers } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { FaRocket } from "react-icons/fa6";

export default function Stats() {
    const stats = [
        {
            number: "1000+",
            label: "Giochi Disponibili",
            icon: <CgGames />
        },
        {
            number: "50K+",
            label: "Utenti Attivi",
            icon: <FaUsers />
        },
        {
            number: "24/7",
            label: "Disponibilità",
            icon: <FaClock />
        },
        {
            number: "99.9%",
            label: "Uptime",
            icon: <FaRocket />
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-neutral-900 mb-6">
                        Numeri che Parlano
                    </h2>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                        La comunità JDeam2 cresce ogni giorno con nuovi giochi e utenti
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div className="text-center group" key={index}>
                            <div className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-large transition-all duration-500 hover:translate-y-[-8px] border border-neutral-200">
                                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 text-primary-600 flex justify-center">
                                    {stat.icon}
                                </div>
                                <div className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {stat.number}
                                </div>
                                <div className="text-lg font-medium text-neutral-600">
                                    {stat.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 