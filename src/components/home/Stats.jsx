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
        <section className="py-16 bg-chiaro text-scuro">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Numeri che Parlano
                    </h2>
                    <p className="text-lg max-w-2xl mx-auto">
                        La comunità JDeam2 cresce ogni giorno con nuovi giochi e utenti
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div className="stat" key={index}>
                            <div className="stat-figure text-secondary">
                                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 text-scuro">
                                    {stat.icon}
                                </div>
                            </div>
                            <div className="stat-title">                            
                                <div className="text-xl font-medium">
                                {stat.label}
                            </div></div>
                            <div className="stat-value">
                                <div className="text-4xl md:text-5xl font-bold text-scuro mb-2">
                                    {stat.number}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
} 