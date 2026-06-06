import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white text-slate-950 transition-colors duration-200 dark:bg-gray-900 dark:text-white">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <Footer />
    </main>
  );
}
