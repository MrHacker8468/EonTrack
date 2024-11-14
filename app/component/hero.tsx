import Image from "next/image";
import { AuthModal } from "./AuthModal";
import HeroImg from "@/public/HeroImg.png";

export function Hero() {
    return (
        <section className="relative flex flex-col items-center justify-center py-16 lg:py-28">
            <div className="relative w-full flex flex-col items-center text-center space-y-8">
                {/* Content */}
                <div className="relative z-10">
                    <span className="text-xl font-semibold text-yellow-300 bg-transparent px-4 py-2 rounded-full shadow-lg">
                        Welcome to EonTrack 1.0
                    </span>
                    <div className="mt-8 text-white text-lg font-semibold">
                        <span>Developed by </span>
                        <span className="text-yellow-300">Prajwal Sontakke</span>
                    </div>

                    <h1 className="mt-6 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-tight drop-shadow-lg">
                        Effortless <span className="text-yellow-300">Scheduling</span> at Your Fingertips
                    </h1>

                    <p className="max-w-2xl mx-auto mt-6 text-lg lg:text-xl text-white/90 tracking-tight">
                        Simplify the way you connect. EonTrack empowers you to organize meetings and appointments with ease - no more back - and - forth emails, just instant scheduling.
                    </p>

                    <div className="mt-8">
                        <AuthModal />
                    </div>
                </div>

                {/* Hero Image */}
                <div className="relative w-full max-w-3xl mx-auto mt-16 lg:mt-20 drop-shadow-2xl">
                    <Image
                        src={HeroImg}
                        alt="EonTrack Hero"
                        className="w-full object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                    />
                </div>
            </div>
        </section>
    );
}
