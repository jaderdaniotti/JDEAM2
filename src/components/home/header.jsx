import ButtonUI from "../buttons/ButtonUI";

export default function Header() {
    return (
        <section className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 grid xl:grid-cols-2 grid-cols-1 items-center justify-center text-center px-6 lg:px-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div
                className="absolute inset-0 opacity-50"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
            ></div>

            <div className="col-span-1 flex flex-col items-center justify-center mt-5 space-y-8 z-10">
                <div className="space-y-6">
                    <h1 className="font-display font-bold text-white text-6xl md:text-8xl lg:text-9xl tracking-tight leading-none">
                        JDeam²
                    </h1>

                    <p className="text-lg md:text-2xl lg:text-3xl text-neutral-200 font-light leading-relaxed max-w-2xl mx-auto">
                        Come JDEAM, ma rifatto da zero, con React e Tailwind CSS per il frontend e Node.js per il backend.
                    </p>

                    <div className="pt-4">
                        <ButtonUI text="Esplora JDeam2" />
                    </div>
                </div>
            </div>

            <div className="col-span-1 flex items-center justify-center z-10">
                <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                    <img
                        src="/immagini/sfondo.png"
                        alt="joystick"
                        className="relative w-full h-full max-w-lg object-contain rounded-3xl opacity-90 group-hover:scale-105 group-hover:rotate-2 group-hover:-translate-y-2 transition-all duration-500"
                    />
                </div>
            </div>
        </section>
    );
}
