"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const HIGGSFIELD_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_34Wo0fE26eVHkrHbFysLp2mW5xd/hf_20260628_114621_a95448e0-4fdc-465b-9bb7-c5688f4fd3b4.mp4";

const BG_COLOR = "#0E1418";

const HIGGSFIELD_IMAGE_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_34Wo0fE26eVHkrHbFysLp2mW5xd/hf_20260628_221735_efacfff4-2258-4a66-b71e-1fcd47fb9493.png";

export default function BombinhasInfoPage() {
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const block1Ref = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);
  const targetTimeRef = useRef(0);
  const progressRef = useRef(0);
  const heroRafRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const video = videoRef.current;
    const heroContainer = heroContainerRef.current;
    const b1 = block1Ref.current;
    const b2 = block2Ref.current;
    if (!video || !heroContainer || !b1 || !b2) return;

    video.pause();

    const onScroll = () => {
      const rect = heroContainer.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      if (scrollableHeight <= 0) return;
      const progress = Math.min(Math.max(-rect.top / scrollableHeight, 0), 1);
      progressRef.current = progress;
      targetTimeRef.current = progress * (video.duration || 0);
    };

    const LERP_FACTOR = 0.22;
    let currentTime = 0;

    const clamp = (v: number) => Math.min(Math.max(v, 0), 1);

    const tick = () => {
      const target = targetTimeRef.current;
      currentTime += (target - currentTime) * LERP_FACTOR;
      if (
        video.readyState >= 2 &&
        Math.abs(currentTime - video.currentTime) > 0.01
      ) {
        video.currentTime = currentTime;
      }

      const p = progressRef.current;

      const b1Opacity = p <= 0.45 ? 1 : clamp(1 - (p - 0.45) / 0.05);
      const b1Blur = p <= 0.45 ? 0 : (1 - b1Opacity) * 12;
      b1.style.opacity = String(b1Opacity);
      b1.style.filter = `blur(${b1Blur}px)`;

      const b2Raw = p <= 0.55 ? 0 : clamp((p - 0.55) / 0.1);
      const b2Blur = (1 - b2Raw) * 12;
      const b2Y = (1 - b2Raw) * 20;
      b2.style.opacity = String(b2Raw);
      b2.style.filter = `blur(${b2Blur}px)`;
      b2.style.transform = `translateY(${b2Y}px)`;

      heroRafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    heroRafRef.current = requestAnimationFrame(tick);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(heroRafRef.current);
    };
  }, []);

  return (
    <div style={{ background: BG_COLOR }}>
      {/* ── SECTION 1: Scroll-Driven Video Header ── */}
      <div ref={heroContainerRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={HIGGSFIELD_VIDEO_URL} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/20 pointer-events-none" />

          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)",
              backdropFilter: "blur(2px)",
            }}
          />

          <div
            ref={block1Ref}
            className="absolute inset-0 z-20 flex flex-col justify-center items-center px-6 text-center pointer-events-none"
          >
            <div className="mx-auto max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 font-playfair bg-gradient-to-r from-[#C9A24B] to-[#E3C174] bg-clip-text text-transparent">
                Un Destino Exclusivo con Restricción Estructural de Oferta
              </h1>
              <p className="text-base md:text-lg font-bold text-white leading-relaxed max-w-3xl mx-auto font-inter">
                Bombinhas es un municipio ubicado en el estado de Santa Catarina, en el litoral
                centro-norte de Brasil. Se trata de una península que avanza hacia el Océano
                Atlántico, con solo 35,9 km² de superficie total, de los cuales
                el <strong className="text-[#E3C174]">67% está bajo protección ambiental</strong>.
                Esta limitación geográfica y legal genera
                una <strong className="text-[#E3C174]">escasez real y permanente de suelo edificable</strong>,
                lo que sostiene la valorización a largo plazo. La ciudad cuenta con 39 playas,
                5 de ellas con la certificación
                internacional <strong className="text-[#E3C174]">Bandeira Azul</strong> (un
                sello de calidad que garantiza aguas limpias, gestión ambiental excelente,
                seguridad y servicios sostenibles). Además, implementa desde 2013
                la <strong className="text-[#E3C174]">Taxa de Preservación Ambiental (TPA)</strong>,
                que regula el acceso vehicular en temporada alta para preservar el entorno.
              </p>
            </div>
          </div>

          <div
            ref={block2Ref}
            className="absolute inset-0 z-20 flex flex-col justify-center items-center px-6 text-center pointer-events-none"
            style={{ opacity: 0 }}
          >
            <div className="mx-auto max-w-4xl">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 font-playfair bg-gradient-to-r from-[#C9A24B] to-[#E3C174] bg-clip-text text-transparent">
                Turismo Potente y Demanda Constante
              </h2>
              <p className="text-base md:text-lg font-bold text-white leading-relaxed max-w-3xl mx-auto font-inter">
                Según datos del IBGE (Instituto Brasileño de Geografía y Estadística),
                Bombinhas tiene
                aproximadamente <strong className="text-[#E3C174]">25.058 habitantes permanentes</strong>.
                Sin embargo, recibe
                entre <strong className="text-[#E3C174]">1,9 y 2,3 millones de turistas</strong> por
                temporada de verano, <strong className="text-[#E3C174]">multiplicando su población
                hasta 92 veces</strong> en los meses pico. Es reconocida como
                la <strong className="text-[#E3C174]">Capital Nacional del Buceo Ecológico</strong> y
                atrae turismo nacional e internacional de nivel medio-alto.
              </p>
            </div>
          </div>

          <div
            className="absolute bottom-0 left-0 w-full h-[50%] pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, transparent 0%, ${BG_COLOR}33 30%, ${BG_COLOR}99 60%, ${BG_COLOR} 100%)`,
              zIndex: 25,
            }}
          />

          <div
            className="absolute bottom-0 left-0 w-full h-[30%] pointer-events-none"
            style={{
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              maskImage: "linear-gradient(to bottom, transparent, black)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent, black)",
              zIndex: 26,
            }}
          />
        </div>
      </div>

      {/* ── SECTION 2: Valorización Inmobiliaria ── */}
      <section className="relative -mt-1 py-24 md:py-32 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 font-playfair bg-gradient-to-r from-[#C9A24B] to-[#E3C174] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Valorización Inmobiliaria
          </motion.h2>
          <motion.p
            className="text-base md:text-lg font-bold text-white leading-relaxed max-w-3xl mx-auto font-inter"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            Santa Catarina es uno de los estados líderes en valorización residencial según
            el <strong className="text-[#C9A24B]">FipeZAP</strong> (el indicador más respetado
            del mercado inmobiliario brasileño, que mide la evolución de precios de venta y
            alquiler en decenas de ciudades). En Bombinhas,
            la <strong className="text-[#C9A24B]">valorización anual histórica se sitúa entre
            12% y 14%</strong> en años típicos, con <strong className="text-[#C9A24B]">picos
            de hasta 25% en zonas premium</strong>. <strong className="text-[#C9A24B]">Nuestros
            proyectos se encuentran precisamente en estas zonas premium</strong>, lo que permite
            capturar un potencial de revalorización superior al promedio del municipio.
          </motion.p>
        </div>
      </section>

      {/* ── SECTION 3: Parallax Window — Etapas de Construcción ── */}
      <section className="relative min-h-[80vh] md:min-h-screen overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${HIGGSFIELD_IMAGE_URL})`,
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="absolute inset-0 bg-black/50 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] md:min-h-screen py-20 md:py-28 px-6">
          <div className="mx-auto max-w-5xl text-center">
            <motion.h2
              className="text-4xl md:text-5xl font-extrabold tracking-tight mb-12 font-playfair bg-gradient-to-r from-[#C9A24B] to-[#E3C174] bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Etapas de Construcción y sus Ventajas
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
              <motion.div
                className="text-left md:text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              >
                <div className="text-[#F3E5AB] uppercase tracking-wide font-bold text-base md:text-lg font-inter mb-3">
                  Pre-lanzamiento / Lanzamiento
                </div>
                <p className="text-base md:text-lg font-bold text-white leading-relaxed font-inter">
                  <strong className="text-[#C9A24B]">Precio más bajo del ciclo</strong>.
                  Mayor potencial de revalorización durante la obra y mejores condiciones
                  de pago (generalmente con cuotas ajustadas por INCC, índice que protege
                  contra la inflación de la construcción). Requiere mayor tolerancia al
                  tiempo de espera.
                </p>
              </motion.div>

              <motion.div
                className="text-left md:text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
              >
                <div className="text-[#F3E5AB] uppercase tracking-wide font-bold text-base md:text-lg font-inter mb-3">
                  En obra
                </div>
                <p className="text-base md:text-lg font-bold text-white leading-relaxed font-inter">
                  <strong className="text-[#C9A24B]">Precio intermedio</strong>. Ya se
                  puede visualizar mejor el proyecto y hay más información disponible.
                  Sigue ofreciendo buen margen de apreciación hasta la entrega.
                </p>
              </motion.div>

              <motion.div
                className="text-left md:text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              >
                <div className="text-[#F3E5AB] uppercase tracking-wide font-bold text-base md:text-lg font-inter mb-3">
                  Entregado / Listo para habitar
                </div>
                <p className="text-base md:text-lg font-bold text-white leading-relaxed font-inter">
                  <strong className="text-[#C9A24B]">Entrega inmediata</strong>. Es el
                  momento ideal si buscas comenzar a generar renta por alquiler de forma
                  inmediata o disfrutar la propiedad como segunda residencia. Además,
                  representa una <strong className="text-[#C9A24B]">excelente oportunidad
                  de flip</strong>: muchos inversores venden la unidad recién entregada,
                  capitalizando la revalorización acumulada durante la obra y obteniendo
                  una <strong className="text-[#C9A24B]">rentabilidad muy llamativa en
                  un plazo relativamente corto</strong>.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Tabla Comparativa de Rentabilidad ── */}
      <section className="relative py-24 md:py-32 px-6">
        <motion.div
          className="mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-12 text-center font-playfair bg-gradient-to-r from-[#C9A24B] to-[#E3C174] bg-clip-text text-transparent">
            Rentabilidad por Alquiler Vacacional
          </h2>

          <div className="overflow-x-auto w-full px-0 md:px-4">
            <table className="w-full border-collapse font-inter">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="p-4 text-left text-sm md:text-base font-bold text-[#C9A24B]">Aspecto</th>
                  <th className="p-4 text-left text-sm md:text-base font-bold text-[#C9A24B]">España 🇪🇸</th>
                  <th className="p-4 text-left text-sm md:text-base font-bold text-[#C9A24B]">Bombinhas 🇧🇷</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Regulación", "Restricciones crecientes y licencias limitadas", "Marco favorable para el alquiler vacacional"],
                  ["Alquiler vacacional", "Cada vez más condicionado", "Totalmente consolidado"],
                  ["Rentabilidad", "Buena, pero con mayor presión regulatoria", "Alto potencial de ingresos por alquiler"],
                  ["Ocupación", "Dependiente de la ubicación y la temporada", "Elevada en zonas premium durante gran parte del año"],
                  ["Demanda turística", "Alta, con fuerte competencia", "Constante y en crecimiento"],
                  ["Revalorización", "Mercado maduro", "Mercado con potencial de crecimiento"],
                  ["Competencia", "Muy elevada", "Menor oferta de propiedades exclusivas"],
                  ["Perfil del inversor", "Búsqueda de estabilidad", "Diversificación y crecimiento patrimonial"],
                  ["Perspectiva de futuro", "Mayor regulación e incertidumbre", "Expansión del turismo y oportunidades de inversión"],
                ].map(([aspect, spain, bombinhas], i) => (
                  <tr key={i} className="border-b border-neutral-800">
                    <td className="p-4 text-sm md:text-base font-bold text-[#C9A24B]">{aspect}</td>
                    <td className="p-4 text-sm md:text-base font-bold text-white">{spain}</td>
                    <td className="p-4 text-sm md:text-base font-bold text-white">{bombinhas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
