import Image from "next/image";
import { Navbar } from "./component/Navbar";
import { auth } from "./lib/auth";
import { redirect } from "next/navigation";
import { Hero } from "./component/hero";
import { Logos } from "./component/logos";
import { Footer } from "./component/footer";

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    return redirect("/dashboard");
  }

  return (
    <>
      <div className="bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <Navbar />
        </div>
      </div>
      <div className="min-h-screen bg-gradient-to-b from-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
          <Logos />
          <Footer/>
        </div>        
      </div>
    </>
  );
}
