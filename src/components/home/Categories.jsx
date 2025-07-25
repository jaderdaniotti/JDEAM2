import ButtonUI from "../buttons/ButtonUI";
import { GiTronArrow } from "react-icons/gi";


export default function Categories() {
    const categories = [
        {
            name: "Action",
            icon: "⚔️",
        },
        {
            name: "Adventure",
            icon: "🗺️",
        },
        {
            name: "RPG",
            icon: "⚡",
        },
        {
            name: "Strategy",
            icon: "🎯",
        },
        {
            name: "Sports",
            icon: "⚽",
        },
        {
            name: "Puzzle",
            icon: "🧩",
        }
    ];

    return (
        <section className="py-16 bg-scuro text-chiaro">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-bianco mb-4">
                        Categorie di Giochi
                    </h2>
                    <p className="text-lg text-chiaro max-w-2xl mx-auto">
                        Esplora i diversi generi e trova il tuo stile di gioco preferito
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-2xl bg-scuro-2 p-6 border-2 border-transparent hover:border-chiaro transition-all duration-300 hover:scale-105 cursor-pointer "
                        >
                            <div className="flex flex-col items-center justify-center text-center gap-2 ">
                                <h3 className="text-2xl font-bold text-bianco">
                                    {category.name}
                                </h3>
                                <div className=" rounded-full bg-chiaro flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-scuro text-xl p-2"><GiTronArrow />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center flex items-center justify-center mt-12">
                    <ButtonUI text="Vedi Tutte le Categorie" />
                </div>
            </div>
        </section>
    );
} 