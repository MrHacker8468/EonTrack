import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import Logo from "@/public/calendar.png";
import { signIn } from "../lib/auth";
import { GitHubAuthButton, GoogleAuthButton } from "./SubmitButtons";
export function AuthModal() {
  return (
    <Dialog> 
        <DialogTrigger asChild>
            <Button>Try for Free</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[360px]">
            <DialogHeader className="flex flex-row justify-center items-center gap-3">
                <Image src={Logo} width={40} height={40} alt="Logo" className="size-10"/>
                 <h4 className="text-3xl font-semibold text-blue-400">Eon<span className="text-emerald-400">Track</span></h4>
            </DialogHeader>
            <div className="flex flex-col mt-5 gap-3 ">
                <form action={async () => {
                    "use server"
                    await signIn("google");
                }} className="w-full">
                <GoogleAuthButton/>
                </form>
                <form action={async () => {
                    "use server"
                    await signIn("github");
                }} className="w-full">
                <GitHubAuthButton  />
                </form>

            </div>
        </DialogContent>
    </Dialog>
  ); 
}