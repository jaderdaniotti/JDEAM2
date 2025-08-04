import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LazyLoadGameImage from "../components/LazyLoadGameImage";
import { CgGames } from "react-icons/cg";

export default function CategoriesPage() {

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
    <section className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 text-neutral-900 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-neutral-900">Categorie di Giochi</h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Esplora le diverse categorie di giochi e trova quello che ti piace di più
          </p>
        </div>

        {/* Grid Categorie */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
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
                  <CgGames className="w-4 h-4" /> 
                  {category.games_count} giochi
                </span>

                <h2 className="text-xl text-center font-bold text-neutral-900 truncate">{category.name}</h2>
                
                <div className="border-t border-neutral-200 pt-4">
                  <Link 
                    to={`/categories/${category.id}`} 
                    className="block w-full text-center bg-primary-600 border-2 font-semibold py-3 px-6 rounded-xl hover:bg-primary-700 transition-all duration-300 hover:shadow-lg"
                  >
                    Esplora Categoria
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistiche Generali */}
        <div className="bg-white rounded-3xl shadow-soft p-8 lg:p-12">
          <h2 className="text-3xl font-display font-bold mb-8 text-center text-neutral-900">Statistiche Generali</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-4xl font-bold text-primary-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                {categories.results ? categories.results.length : 0}
              </div>
              <div className="text-neutral-600 font-medium">Categorie</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-secondary-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                {categories.results ? categories.results.reduce((acc, cat) => acc + (cat.games_count || 0), 0) : 0}
              </div>
              <div className="text-neutral-600 font-medium">Giochi Totali</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-success-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                {categories.results && categories.results.length > 0 
                  ? Math.round(categories.results.reduce((acc, cat) => acc + (cat.games_count || 0), 0) / categories.results.length)
                  : 0}
              </div>
              <div className="text-neutral-600 font-medium">Media per Categoria</div>
            </div>
            <div className="text-center group">
              <div className="text-2xl font-bold text-warning-600 mb-2 group-hover:scale-110 transition-transform duration-300 truncate">
                {categories.results && categories.results.length > 0 
                  ? categories.results.sort((a, b) => (b.games_count || 0) - (a.games_count || 0))[0]?.name || 'N/A'
                  : 'N/A'}
              </div>
              <div className="text-neutral-600 font-medium">Categoria Più Popolare</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 