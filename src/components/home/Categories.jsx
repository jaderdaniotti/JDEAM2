import ButtonUI from "../buttons/ButtonUI";
import { GiTronArrow } from "react-icons/gi";
import { useState, useEffect } from "react";
import LazyLoadGameImage from "../LazyLoadGameImage";
import { CgGames } from "react-icons/cg";
import { Link } from "react-router-dom";

export default function Categories() {
    const [categories, Setcategories] = useState([]);

    const getCategories = async () => {
        const promise = await fetch("https://api.rawg.io/api/genres?key=fe79071ec2d64d9a8864d79740169bfd");
        const json = await promise.json();

        Setcategories(json);
    }
    useEffect(() => {
        getCategories();
    }, []);


    return (
        <section className="py-20 bg-gradient-to-br from-neutral-100 to-neutral-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-neutral-900 mb-6">
                        Categorie di Giochi
                    </h2>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                        Esplora i diversi generi e trova il tuo stile di gioco preferito
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {categories.results && categories.results.map((category) => (
                        <div
                            className="group relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-500 hover:translate-y-[-8px] border border-neutral-200" 
                            key={category.id}
                        >
                            <div className="relative overflow-hidden">
                                <LazyLoadGameImage image={category.image_background} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            </div>
                      
                            <div className="p-6 flex flex-col gap-4">
                                <span className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 font-medium text-sm px-4 py-2 rounded-full self-center">
                                    <CgGames className="w-4 h-4"/> {category.games_count} giochi
                                </span>
                      
                                <h2 className="text-lg text-center font-bold text-neutral-900 truncate">{category.name}</h2>
                                
                                <div className="border-t border-neutral-200 pt-4">
                                    <Link 
                                        to={`/categories/${category.id}`} 
                                        className="block w-full text-center bg-primary-600 border-2 font-semibold py-3 px-6 rounded-xl hover:bg-primary-700 transition-all duration-300 hover:shadow-lg"
                                    >
                                        Esplora
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 