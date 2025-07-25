import { BiCategoryAlt } from "react-icons/bi";
import LazyLoadGameImage from "./LazyLoadGameImage";
import { Link } from "react-router-dom";

export default function GameCard({ title, image, genre, released, id }) {

  return (
    <div
      className="relative group w-full max-w-xs bg-scuro text-white rounded-3xl overflow-hidden border-1 border-chiaro  transition duration-300 hover:translate-y-[-10px]">

      <LazyLoadGameImage image={image} />

      <div className="p-4 flex flex-col gap-3 ">
        <span className="text-xs flex items-center gap-2 bg-chiaro text-scuro font-normal self-center px-3 py-1 rounded-full shadow-sm  tracking-wider truncate ">
          <BiCategoryAlt className="w-4 h-4"/> {genre}
        </span>

        <h2 className="text-lg font-extrabold text-white truncate drop-shadow-sm">{title}</h2>
        <span className="text-sm text-chiaro">{released}</span>
        <hr className="border-chiaro" />
        <Link to={`/game/${id}`} className="self-center relative mt-3 text-sm mb-0 px-4 py-2 rounded-full bg-white text-[#1B1A30] font-semibold transition hover:bg-[#FF6F61] hover:text-white">
          Dettagli
        </Link>
      </div>
    </div>
  );
}
