import Image from "next/image";
import NextjsLogo from "@/public/nextjs.png";
import VercelLogo from "@/public/vercel_logo.png";
import Tailwindlogo from "@/public/tailwind.png";
import NylasLogo from "@/public/Nylas-logo-horizontal-black_.png";
import shadcn_logo from "@/public/shadcn_ui.png";

export function Logos() {
    return (
        <div className="py-12">
            <h2 className="text-center text-4xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                Powering Innovation with Cutting-Edge Technologies
            </h2>

            <p className="text-center mt-4 text-lg text-gray-400">
                These essential tools bring our vision to life, enabling seamless experiences and exceptional performance.
            </p>

            <div className="mt-10 grid max-w-lg mx-auto grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-5 sm:gap-x-10 lg:mx-0 lg:max-w-none">
                <Image src={NylasLogo} alt="Nylas logo" className="h-36 w-36 object-contain dark:invert" />
                <Image src={NextjsLogo} alt="Next.js logo" className="h-36 w-36 object-contain dark:invert" />
                <Image src={Tailwindlogo} alt="Tailwind CSS logo" className="h-36 w-36 object-contain dark:invert" />
                <Image src={VercelLogo} alt="Vercel logo" className="h-36 w-36 object-contain dark:invert" />
                <Image src={shadcn_logo} alt="shadcn logo" className="h-36 w-36 object-contain dark:invert" />
            </div>
        </div>
    );
}
