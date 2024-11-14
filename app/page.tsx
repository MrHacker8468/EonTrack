import Image from "next/image";
import { Navbar } from "./component/Navbar";
import { auth } from "./lib/auth";
import { redirect } from "next/navigation";
import { Hero } from "./component/hero";
import { Logos } from "./component/logos";

export default async function Home() {

  const session = await auth();
  if (session?.user) {
    return redirect("/dashboard");
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <Hero />
      <Logos/>
    </div>
  );
}