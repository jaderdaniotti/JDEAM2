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
        //console.log(json);
        Setcategories(json);
    }
    useEffect(() => {
        getCategories();
    }, []);


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

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {categories.results && categories.results.map((category) => (
                            <div
                            className="relative group w-full max-w-xs bg-scuro text-white rounded-3xl overflow-hidden border-1 border-chiaro  transition duration-300 hover:translate-y-[-10px]" key={category.id}>
                      
                            <LazyLoadGameImage image={category.image_background} />
                      
                            <div className="p-4 flex flex-col gap-2 ">
                              <span className="text-xs flex items-center gap-2 bg-chiaro text-scuro font-normal self-center px-3 py-1 rounded-full shadow-sm  tracking-wider truncate ">
                                <CgGames className="w-4 h-4"/> {category.games_count}
                              </span>
                      
                              <h2 className="text-lg text-center font-extrabold text-white truncate drop-shadow-sm">{category.name}</h2>
                              <span className="text-sm text-chiaro"></span>
                              <hr className="border-chiaro" />
                              <Link to={`/categories/${category.id}`} className="self-center relative mt-3 text-sm mb-0 px-4 py-2 rounded-full bg-white text-[#1B1A30] font-semibold transition hover:bg-[#FF6F61] hover:text-white">
                                Dettagli
                              </Link>
                            </div>
                          </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 