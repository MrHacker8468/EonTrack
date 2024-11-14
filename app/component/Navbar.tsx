import Image from "next/image";
import Link from "next/link";
import calender from "@/public/calendar.png";
import { AuthModal } from "./AuthModal";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <div className="flex justify-center py-5 bg-transparent">
      <div className="w-4/5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={calender} alt="calendar logo" className="size-10" />
          <h4 className="text-3xl font-semibold text-blue-400">
            Eon<span className="text-emerald-400">Track</span>
          </h4>
        </Link>

        <div className="hidden md:flex md:justify-end md:space-x-4">
          <ThemeToggle />
          <AuthModal />
        </div>
      </div>
    </div>
  );
}
