import { BiCategoryAlt } from "react-icons/bi";
import LazyLoadGameImage from "./LazyLoadGameImage";
import { Link } from "react-router-dom";

export default function GameCard({ title, image, genre, released, id }) {

  return (
    <div
      className="group relative  rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-500 hover:translate-y-[-8px] border-1">

      <div className="relative overflow-hidden">
        <LazyLoadGameImage image={image} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="p-6 flex flex-col gap-4">
        <span className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 font-medium text-sm px-4 py-2 rounded-full self-center border-2">
          <BiCategoryAlt className="w-4 h-4"/> {genre}
        </span>

        <h2 className="text-lg font-bold  truncate">{title}</h2>
        <span className="text-sm ">{released}</span>
        
        <div className="border-t border-neutral-200 pt-4 flex justify-center">
          <Link 
            to={`/game/${id}`} 
            className="bg-primary-600 border-2 font-semibold w-max  px-10 py-3 rounded-xl hover:bg-primary-700 transition-all duration-300 hover:shadow-lg disabled:opacity-50 "
          >
            Dettagli
          </Link>
        </div>
      </div>
    </div>
  );
}
