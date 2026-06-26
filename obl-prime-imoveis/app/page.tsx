import Navbar from "./components/Navbar";
import ScrollHero from "./components/ScrollHero";

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollHero />
      <section className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-center">
        <h2 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
          OBL Prime Imóveis
        </h2>
        <p className="mt-4 max-w-lg text-lg text-zinc-400">
          Propiedades exclusivas frente al mar en Bombinhas, Santa Catarina.
        </p>
      </section>
    </>
  );
}
