import Image from "next/image";
import NextjsLogo from "@/public/nextjssvg.svg";
import VercelLogo from "@/public/vercel-seeklogo.svg";
import NylasLogo from "@/public/Nylas-logo-horizontal-black_.png";

export function Logos() {

    return(
        <div className="py-10">
            <h2 className="text-center text-lg font-semibold leading-7 ">Devloped using these components.</h2>
        
            <div className="mt-10 grid max-w-lg mx-auto grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:gris-cols-5">
            <Image src={NylasLogo} alt="nylas logo" className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert" />
            <Image src={NextjsLogo} alt="nylas logo" className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert" />
            <Image src={NylasLogo} alt="nylas logo" className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert" />
            </div>
        
        </div>
        
    )
}