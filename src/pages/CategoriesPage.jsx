import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LazyLoadGameImage from "../components/LazyLoadGameImage";
import { CgGames } from "react-icons/cg";

export default function CategoriesPage() {

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
    <section className="min-h-screen bg-chiaro-2 text-scuro py-8">
      <div className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Categorie di Giochi</h1>
          <p className="text-xl text-scuro-2 max-w-2xl mx-auto">
            Esplora le diverse categorie di giochi e trova quello che ti piace di più
          </p>
        </div>

        {/* Grid Categorie */}
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center gap-8">
          {categories.results && categories.results.map((category) => (
            <div
              className="relative group w-full max-w-xs bg-scuro text-white rounded-3xl overflow-hidden border-1 border-chiaro mx-auto transition duration-300 hover:translate-y-[-10px]" key={category.id}>

              <LazyLoadGameImage image={category.image_background} />

              <div className="p-4 flex flex-col gap-2 ">
                <span className="text-xs flex items-center gap-2 bg-chiaro text-scuro font-normal self-center px-3 py-1 rounded-full shadow-sm  tracking-wider truncate ">
                  <CgGames className="w-4 h-4" /> {category.games_count}
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

        {/* Statistiche Generali */}
        <div className="mt-16 bg-bianco rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Statistiche Generali</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-scuro mb-2">{categories.results ? categories.results.length : 0}</div>
              <div className="text-scuro-2">Categorie</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-scuro mb-2">
                {categories.results ? categories.results.reduce((acc, cat) => acc + (cat.games_count || 0), 0) : 0}
              </div>
              <div className="text-scuro-2">Giochi Totali</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-scuro mb-2">
                {categories.results && categories.results.length > 0 
                  ? Math.round(categories.results.reduce((acc, cat) => acc + (cat.games_count || 0), 0) / categories.results.length)
                  : 0}
              </div>
              <div className="text-scuro-2">Media per Categoria</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-scuro mb-2">
                {categories.results && categories.results.length > 0 
                  ? categories.results.sort((a, b) => (b.games_count || 0) - (a.games_count || 0))[0]?.name || 'N/A'
                  : 'N/A'}
              </div>
              <div className="text-scuro-2">Categoria Più Popolare</div>
            </div>
          </div>
        </div>

       
      </div>
    </section>
  );
} 