import ButtonUI from "../buttons/ButtonUI";

export default function Header() {
    return (
        <section className="py-10 gap-2 bg-scuro grid xl:grid-cols-4 grid-cols-1 items-center justify-center text-center px-4 sfondo-hero">
            <div className="col-span-2 flex flex-col items-center justify-center ">
                 <div className="font-bold text-bianco rounded-lg p-3 text-7xl md:text-9xl translate-z-3 tracking-tight">JDeam²</div>
                
                <p className="text-lg font-normal md:text-3xl text-chiaro mb-8 tracking-tighter">
                    Come JDEAM, ma rifatto da zero, con React e Tailwind CSS per il frontend e Node.js per il backend.
                </p>
                <ButtonUI text="Esplora JDeam2" />
            </div>
            <div className="col-span-2 flex items-center justify-center">
            <img src="/immagini/sfondo.png" alt="joistyck" 
            className=
            "w-full h-full md:size-130 object-contain rounded-4xl opacity-90 hover:scale-105 hover:rotate-3 hover:-translate-y-1 transition-all duration-300" />
            </div>
        </section>
    );
}