"use client";

import { motion } from "framer-motion";

const BG_COLOR = "#0E1418";

const HIGGSFIELD_IMAGE_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_34Wo0fE26eVHkrHbFysLp2mW5xd/hf_20260628_221735_efacfff4-2258-4a66-b71e-1fcd47fb9493.png";

const STAGGER = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};
const FADE_UP = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const, delay } },
});

export default function BombinhasInfoPage() {
  return (
    <div style={{ background: BG_COLOR }}>

      {/* ── HERO: Tipografía pura ── */}
      <section className="relative flex flex-col justify-center items-center px-6 pt-32 pb-12 text-center overflow-hidden">

        {/* Noise grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "300px 300px",
          }}
        />

        {/* Radial gold glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 55%, rgba(201,162,75,0.09) 0%, transparent 70%)",
          }}
        />

        <motion.div
          className="relative z-10 mx-auto max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={STAGGER}
        >
          {/* Location badge */}
          <motion.div variants={FADE_UP(0)}>
            <span
              className="inline-flex items-center gap-2 mb-8 px-5 py-1.5 rounded-full font-inter"
              style={{
                border: "1px solid rgba(201,162,75,0.35)",
                color: "#C9A24B",
                background: "rgba(201,162,75,0.07)",
                fontSize: "0.68rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Bombinhas · Santa Catarina · Brasil
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            variants={FADE_UP(0)}
            className="text-4xl md:text-6xl tracking-tight mb-6 font-playfair bg-gradient-to-r from-[#C9A24B] to-[#E3C174] bg-clip-text text-transparent"
            style={{ lineHeight: 1.15 }}
          >
            Un Destino Exclusivo con Restricción Estructural de Oferta
          </motion.h1>

          {/* Stat chips */}
          <motion.div
            variants={FADE_UP(0)}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {[
              "35,9 km² de superficie",
              "67% protección ambiental",
              "39 playas",
              "5× Bandeira Azul",
            ].map((stat) => (
              <span
                key={stat}
                className="font-inter text-xs px-4 py-1.5 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.65)",
                  letterSpacing: "0.05em",
                }}
              >
                {stat}
              </span>
            ))}
          </motion.div>
        </motion.div>

      </section>

      {/* ── INTRO: Geografía y Turismo ── */}
      <section className="relative pt-6 pb-16 md:pb-24 px-6">
        <div className="mx-auto max-w-4xl space-y-20">

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-base md:text-xl text-white leading-loose font-cardo">
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
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl tracking-tight mb-6 pb-2 font-playfair bg-gradient-to-r from-[#C9A24B] to-[#E3C174] bg-clip-text text-transparent">
              Turismo Potente y Demanda Constante
            </h2>
            <p className="text-base md:text-xl text-white leading-loose font-cardo">
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
          </motion.div>

        </div>
      </section>

      {/* ── SECTION 2: Valorización Inmobiliaria ── */}
      <section className="relative -mt-1 py-24 md:py-32 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            className="text-4xl md:text-5xl tracking-tight mb-6 pb-2 font-playfair bg-gradient-to-r from-[#C9A24B] to-[#E3C174] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Valorización Inmobiliaria
          </motion.h2>
          <motion.p
            className="text-base md:text-xl text-white leading-loose max-w-3xl mx-auto font-cardo"
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
              className="text-4xl md:text-5xl tracking-tight mb-12 pb-2 font-playfair bg-gradient-to-r from-[#C9A24B] to-[#E3C174] bg-clip-text text-transparent"
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
                <div className="text-[#F3E5AB] uppercase tracking-wide text-base md:text-lg font-playfair mb-3">
                  Pre-lanzamiento / Lanzamiento
                </div>
                <p className="text-base md:text-lg text-white leading-loose font-cardo">
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
                <div className="text-[#F3E5AB] uppercase tracking-wide text-base md:text-lg font-playfair mb-3">
                  En obra
                </div>
                <p className="text-base md:text-lg text-white leading-loose font-cardo">
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
                <div className="text-[#F3E5AB] uppercase tracking-wide text-base md:text-lg font-playfair mb-3">
                  Entregado / Listo para habitar
                </div>
                <p className="text-base md:text-lg text-white leading-loose font-cardo">
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

      {/* ── SECTION 4: Simulador de Rentabilidad por Tipología ── */}
      <section className="relative py-24 md:py-32 px-6">
        <motion.div
          className="mx-auto max-w-6xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl tracking-tight mb-4 pb-2 text-center font-playfair bg-gradient-to-r from-[#C9A24B] to-[#E3C174] bg-clip-text text-transparent">
            Rentabilidad y Revalorización
          </h2>
          <p className="text-center text-neutral-400 text-sm mb-16 font-inter">
            Datos reales de mercado — VivaReal · ZAP Imóveis · Bombinhas, SC (2026)
          </p>

          {/* Tabla unificada */}
          <div className="mb-10 overflow-x-auto w-full">
            <table className="w-full border-collapse font-inter">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="p-4 text-left text-sm md:text-base font-bold text-[#C9A24B] font-playfair whitespace-nowrap">Tipología</th>
                  <th className="p-4 text-center text-sm md:text-base font-bold text-[#C9A24B] font-playfair whitespace-nowrap">Precio de Compra</th>
                  <th className="p-4 text-center text-sm md:text-base font-bold text-neutral-400 font-playfair whitespace-nowrap">Diária Baja<br/><span className="text-xs font-inter font-normal text-neutral-500">Mar – Nov</span></th>
                  <th className="p-4 text-center text-sm md:text-base font-bold text-[#E3C174] font-playfair whitespace-nowrap">Diária Alta<br/><span className="text-xs font-inter font-normal text-neutral-500">Dic – Feb · Carnaval</span></th>
                  <th className="p-4 text-center text-sm md:text-base font-bold text-[#C9A24B] font-playfair whitespace-nowrap">ROI Bruto</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tipo: "1 Dormitório",         precio: "R$ 790 – 900 k",   baja: "R$ 400 – 550",   alta: "R$ 800 – 1.500",  roi: "11 – 14 %" },
                  { tipo: "2 Dormitórios",         precio: "R$ 910 k – 1,2 M", baja: "R$ 400 – 800",   alta: "R$ 825 – 1.150",  roi: "8 – 10 %"  },
                  { tipo: "2 Dormitórios Premium", precio: "R$ 1,2 M – 1,4 M", baja: "R$ 600 – 790",   alta: "R$ 1.150 – 2.000", roi: "8 – 9 %"  },
                  { tipo: "3 Dorm. / Cobertura",   precio: "R$ 1,3 M – 2,1 M", baja: "R$ 450 – 900",   alta: "R$ 1.290 – 2.650", roi: "7 – 9 %"  },
                ].map((row, i) => (
                  <tr key={i} className={`border-b border-neutral-800 transition-colors hover:bg-white/[0.03] ${i % 2 === 0 ? "bg-white/[0.015]" : ""}`}>
                    <td className="p-4 text-left text-sm md:text-base font-semibold font-playfair text-[#C9A24B] whitespace-nowrap">{row.tipo}</td>
                    <td className="p-4 text-center text-sm md:text-base font-cardo text-white whitespace-nowrap">{row.precio}</td>
                    <td className="p-4 text-center text-sm md:text-base font-cardo text-neutral-400 whitespace-nowrap">{row.baja}</td>
                    <td className="p-4 text-center text-sm md:text-base font-cardo text-[#E3C174] whitespace-nowrap">{row.alta}</td>
                    <td className="p-4 text-center text-sm md:text-base font-bold font-inter text-emerald-400 whitespace-nowrap">{row.roi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Nota metodológica */}
          <p className="text-center text-neutral-500 text-xs mb-12 font-inter">
            * Precios de compra: VivaReal · ZAP Imóveis (oct. 2026). Diárias verificadas: Arlete Imóveis, VRM Imóveis, CasaFerias, Paraíso Bombinhas, roccoImob (temp. 2025/26–26/27). ROI bruto anual = ingresos totales / precio de compra. No incluye gestión (10–15%), IPTU ni mantenimiento.
          </p>

          {/* Bloque de revalorización */}
          <div className="relative rounded-2xl border border-[#C9A24B]/20 bg-white/[0.02] px-8 py-8 md:px-12">
            <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-[#C9A24B]/40 to-transparent" />
            <p className="text-sm md:text-base font-inter text-neutral-300 leading-relaxed">
              <span className="text-[#E3C174] font-semibold">Más allá de la renta, el capital también trabaja.</span>{" "}
              Bombinhas lideró el ranking nacional de valorización con{" "}
              <span className="text-white font-semibold">+14,3 % en 12 meses</span>{" "}
              (FipeZap+, 2026), por encima de Balneário Camboriú e Itapema, y hasta un{" "}
              <span className="text-white font-semibold">25 % anual</span>{" "}
              en zonas prime como Mariscal. Con oferta estructuralmente limitada por su geografía de península y el 70 % de Mata Atlântica protegida,
              el retorno total, renta más apreciación, se sitúa entre el{" "}
              <span className="text-white font-semibold">18 y el 20 % anual</span>{" "}
              <span className="text-neutral-500 text-xs">(FipeZap+ · AirDNA · ViveremSC, 2026)</span>.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
