import Image from "next/image";
import { AuthModal } from "./AuthModal";
import HeroImg from "@/public/HeroImg.png";

export function Hero() {
    return (
        <section className="relative flex flex-col items-center justify-center py-12 lg:py-20">
            {/* Container for gradient overlay */}
            <div className="relative w-full flex flex-col items-center text-center">

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-70"></div>

                {/* Content */}
                <div className="relative z-10">
                    <span className="text-sm text-primary font-medium tracking-tighter bg-pr/10 px-4 py-2 rounded-full">Introducing to EonTrack 1.0</span>
                    <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-none">
                        Scheduling Made <span className="block text-primary">Super Easy</span>
                    </h1>
                    <p className="max-w-xl mx-auto mt-4 lg:text-lg text-muted-foreground">Scheduling a meeting with your friends and family has never been easier. With EonTrack, you can easily schedule meetings with your friends and family, and get them to the meeting in a few clicks.</p>
                    <div className="mt-5 mb-12">
                        <AuthModal />
                    </div>
                </div>

                {/* Image */}
                <div className="relative items-center w-full py-1 mx-auto mt-12">
                    <Image
                        src={HeroImg}
                        alt="hero"
                        className="w-full object-cover border rounded-lg shadow-2xl lg:rounded-2xl"
                    />
                </div>
            </div>
        </section>
    );
}
