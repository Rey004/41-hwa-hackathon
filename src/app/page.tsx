import Link from "next/link";
import {
  ArrowRight,
  PawPrint,
  Play,
  Check,
  Target,
  LayoutGrid,
  Clock,
  Heart,
  Sparkles,
  ShieldCheck,
  Truck,
  RefreshCw,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { PolishedImage } from "@/components/polished-image";
import { Header } from "@/components/header";
import Footer from "@/components/footer";
import { ZoneShowcase } from "@/components/zone-showcase";
import { ZoneDiagram } from "@/components/zone-diagram";
import {
  TRAINING_ZONES,
  TRAINING_STEPS,
  LEARNING_STAGES,
  LEARNING_CATEGORIES,
  SPECIFICATIONS,
  FAQS,
} from "@/lib/products";

export const metadata = {
  title: "Pawpath — Every pawstep learns something.",
  description:
    "Premium all-in-one interactive dog training mat. Playtime with a little more purpose.",
};

const ZONE_ICONS = { Target, LayoutGrid, Clock, ArrowRight, Heart };

const TONE: Record<string, string> = {
  green: "bg-organic-green",
  mint: "bg-pale-mint",
  forest: "bg-forest-green",
  coral: "bg-coral",
};

export default function HomePage() {
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden bg-ivory">
      <Header />

      {/* Announcement ticker */}
      <div className="overflow-hidden bg-forest-green text-white">
        <div className="flex w-max animate-[ticker_28s_linear_infinite] gap-12 py-2.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-12 whitespace-nowrap">
              <span className="text-[11px] font-heading font-bold uppercase tracking-[0.2em]">
                Free worldwide shipping over $75
              </span>
              <PawPrint className="h-3 w-3 fill-organic-green text-organic-green" />
              <span className="text-[11px] font-heading font-bold uppercase tracking-[0.2em]">
                30-day happiness guarantee
              </span>
              <PawPrint className="h-3 w-3 fill-organic-green text-organic-green" />
              <span className="text-[11px] font-heading font-bold uppercase tracking-[0.2em]">
                One mat · Five learning zones · Every breed
              </span>
              <PawPrint className="h-3 w-3 fill-organic-green text-organic-green" />
            </div>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="relative px-6 pt-16 pb-24 lg:px-12 lg:pt-20 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 lg:pl-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-organic-green px-3 py-1 text-white text-[10px] font-heading font-bold uppercase tracking-[0.2em]">
                <Sparkles className="h-3 w-3" />
                New — The Pawpath Mat
              </span>
              <h1 className="mt-6 font-heading font-extrabold text-[clamp(4rem,15vw,9rem)] leading-[0.82] tracking-[-0.05em] text-forest-green">
                PAW
                <span className="relative inline-block">
                  PATH
                  <svg
                    viewBox="0 0 200 24"
                    className="absolute -bottom-2 left-0 w-full"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 16C46 6 104 4 196 10"
                      stroke="#fb7185"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
              <p className="mt-8 text-xl text-gray-600 leading-relaxed max-w-lg">
                Every pawstep learns something. The all-in-one interactive training
                mat that turns ordinary playtime into real progress.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/product/pawpath">
                    Shop the Mat
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/#zones">
                    <Play className="mr-2 h-4 w-4" />
                    See how it works
                  </Link>
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-[11px] font-heading font-bold uppercase tracking-[0.18em] text-gray-400">
                <span className="inline-flex items-center gap-2">
                  <Truck className="h-4 w-4 text-forest-green" /> Free shipping
                </span>
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-forest-green" /> 30-day
                  guarantee
                </span>
                <span className="inline-flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-forest-green" /> Free returns
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="absolute -inset-8 rounded-[4rem] bg-organic-green/15 blur-3xl" />
              <div className="relative rounded-[3rem] border-4 border-white bg-pale-mint shadow-2xl overflow-hidden">
                <PolishedImage
                  src="/images/products/hero.svg"
                  alt="Golden retriever playing on the Pawpath training mat"
                  width={900}
                  height={900}
                  className="w-full aspect-square object-cover"
                  placeholderColor="#dcfce7"
                  priority
                />
              </div>

              <div className="absolute -bottom-6 -left-4 sm:-left-8 rounded-[1.75rem] bg-white p-5 shadow-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {["#22c55e", "#14532d", "#fb7185"].map((c) => (
                      <span
                        key={c}
                        className="w-7 h-7 rounded-full border-2 border-white"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 fill-organic-green text-organic-green"
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      12,400+ happy dogs
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-5 -right-3 sm:-right-6 rounded-full bg-forest-green text-white px-5 py-3 shadow-xl">
                <p className="text-[10px] font-heading font-bold uppercase tracking-[0.18em] text-white/60">
                  As seen in
                </p>
                <p className="font-heading font-extrabold text-lg leading-none">
                  PETS TODAY
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="px-6 pb-24 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-[2rem] bg-gray-100 border border-gray-100">
            {[
              { value: "90 × 60", label: "Centimetres of play" },
              { value: "5", label: "Built-in learning zones" },
              { value: "8+", label: "Weeks from puppy to proof" },
              { value: "4.9", label: "Average owner rating" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white px-6 py-9 text-center">
                <p className="font-heading font-extrabold text-[2.5rem] leading-none text-forest-green">
                  {stat.value}
                </p>
                <p className="mt-2 text-[11px] font-heading font-semibold uppercase tracking-[0.16em] text-gray-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand storytelling */}
      <section className="px-6 pb-28 bg-white lg:px-12 lg:pb-36">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-56 h-56 rounded-full bg-pale-mint blur-2xl" />
            <div className="relative rounded-[2.5rem] border-8 border-white shadow-xl overflow-hidden">
              <PolishedImage
                src="/images/products/lifestyle.svg"
                alt="Golden retriever playing on the Pawpath mat"
                width={700}
                height={700}
                className="w-full aspect-square object-cover"
                placeholderColor="#f0fdfa"
              />
            </div>
            <div className="absolute -bottom-5 right-4 sm:-right-6 rounded-[1.5rem] bg-pale-mint border border-organic-green/20 px-6 py-4 shadow-lg">
              <p className="font-heading font-extrabold text-2xl text-forest-green leading-none">
                01
              </p>
              <p className="text-[10px] font-heading font-bold uppercase tracking-[0.16em] text-gray-500 mt-1">
                One mat
              </p>
            </div>
          </div>

          <div className="lg:pl-6">
            <span className="text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-organic-green-dark">
              Our story
            </span>
            <h2 className="mt-4 font-heading font-extrabold text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.02] tracking-tight text-forest-green">
              Playtime with a little more purpose
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Pawpath began with a simple frustration: training required a dozen
              props, a rigid routine, and a dog who was clearly bored. So we built
              one surface that does the thinking for you. Five zones, permanently
              moulded in, that turn a five-minute game into a milestone.
            </p>

            <div className="mt-10 space-y-7">
              {[
                {
                  title: "Five built-in learning zones",
                  body: "Target, place, wot, pathway and reward — permanently integrated into one surface.",
                },
                {
                  title: "Designed for every life stage",
                  body: "Puppy foundations to adult mastery, on the same mat you bought at the start.",
                },
                {
                  title: "Premium, pet-safe materials",
                  body: "Non-toxic TPE surface, natural rubber backing, built for claws and teeth.",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-forest-green/10 text-forest-green">
                    <Check className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-heading font-bold text-gray-800">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-sm text-gray-500">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive product showcase */}
      <section id="zones" className="px-6 pb-28 lg:px-12 lg:pb-36">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-organic-green-dark">
              Interactive showcase
            </span>
            <h2 className="mt-4 font-heading font-extrabold text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.02] tracking-tight text-forest-green">
              One mat. Many milestones.
            </h2>
            <p className="mt-5 text-lg text-gray-600">
              Tap a zone to see the skill it teaches — and how the mat guides your
              dog there without a single treat thrown across the room.
            </p>
          </div>
          <ZoneShowcase />
        </div>
      </section>

      {/* Zone diagram */}
      <section className="px-6 pb-28 bg-ivory lg:px-12 lg:pb-36">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-14 items-center">
          <div className="order-2 lg:order-1">
            <ZoneDiagram />
          </div>
          <div className="order-1 lg:order-2 lg:pl-6">
            <span className="text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-organic-green-dark">
              How the mat works
            </span>
            <h2 className="mt-4 font-heading font-extrabold text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.02] tracking-tight text-forest-green">
              Five zones. One purpose.
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Each zone has a job, a colour and a shape your dog can read at a
              glance. That clarity is what makes the learning stick — and what
              turns a 90 × 60 cm rectangle into the most useful thing in the room.
            </p>
            <div className="mt-9 space-y-3">
              {TRAINING_ZONES.map((zone, index) => {
                const Icon = ZONE_ICONS[zone.icon as keyof typeof ZONE_ICONS];
                const tone =
                  index === 0
                    ? "green"
                    : index === 1
                      ? "mint"
                      : index === 2
                        ? "forest"
                        : index === 3
                          ? "coral"
                          : "green";
                return (
                  <div
                    key={zone.id}
                    className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 border border-gray-100"
                  >
                    <span
                      className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl ${TONE[tone]} ${
                        tone === "mint" ? "text-forest-green" : "text-white"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-heading font-bold text-gray-800 leading-tight">
                        {zone.title}
                      </p>
                      <p className="text-xs text-gray-500">{zone.name} zone</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Big dark container — packaging / value */}
      <section className="px-6 pb-28 lg:px-12 lg:pb-36">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[3rem] bg-forest-green text-white">
            <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-organic-green/25 blur-3xl" />
            <div className="absolute -bottom-32 -left-16 w-96 h-96 rounded-full bg-coral/15 blur-3xl" />
            <div className="relative grid lg:grid-cols-12 gap-10 p-8 sm:p-12 lg:p-16">
              <div className="lg:col-span-5">
                <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-heading font-bold uppercase tracking-[0.2em]">
                  In the box
                </span>
                <h2 className="mt-5 font-heading font-extrabold text-[clamp(2rem,4vw,3rem)] leading-[1.05]">
                  Everything you need to start on day one
                </h2>
                <p className="mt-5 text-white/75 leading-relaxed">
                  The Pawpath Training Mat arrives ready to use, with a quick-start
                  guide for each zone and a progression sheet for recording every
                  milestone.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "1 × Pawpath Training Mat (90 × 60 cm)",
                    "1 × Zone-by-zone quick-start guide",
                    "1 × Milestone progression sheet",
                    "1 × Treat pouch with Pawpath print",
                  ].map((line) => (
                    <li
                      key={line}
                      className="flex items-center gap-3 text-sm text-white/85"
                    >
                      <Check className="h-4 w-4 flex-none text-organic-green" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-7">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-[2rem] bg-white/10 backdrop-blur border border-white/15 p-6 sm:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-white/60">
                        Packaging
                      </p>
                      <span className="rounded-full bg-organic-green px-3 py-1 text-[10px] font-heading font-bold uppercase tracking-widest text-white">
                        Recycled
                      </span>
                    </div>
                    <div className="rounded-[1.5rem] bg-ivory p-6 flex items-center gap-5">
                      <div className="h-20 w-20 flex-none rounded-2xl bg-forest-green flex items-center justify-center">
                        <PawPrint className="h-9 w-9 text-organic-green fill-organic-green" />
                      </div>
                      <div>
                        <p className="font-heading font-extrabold text-2xl text-forest-green leading-none">
                          PAWPATH
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Training Mat · 90 × 60 cm
                        </p>
                      </div>
                    </div>
                  </div>
                  {[
                    { title: "Recycled cardboard", body: "FSC-certified, plastic-free" },
                    { title: "Zero plastic", body: "Printed with soy-based inks" },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[2rem] bg-white/10 backdrop-blur border border-white/15 p-6"
                    >
                      <p className="font-heading font-bold">{item.title}</p>
                      <p className="mt-1 text-sm text-white/65">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning categories */}
      <section className="px-6 pb-28 bg-white lg:px-12 lg:pb-36">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 mb-14">
            <div className="lg:max-w-xl">
              <span className="text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-organic-green-dark">
                Learning categories
              </span>
              <h2 className="mt-4 font-heading font-extrabold text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.02] tracking-tight text-forest-green">
                One mat, four ways to grow
              </h2>
            </div>
            <p className="lg:ml-auto lg:max-w-sm text-gray-600 leading-relaxed">
              Every zone contributes to a wider curriculum. Pick a category and
              see the behaviours your dog can master on the same surface.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LEARNING_CATEGORIES.map((category, index) => (
              <Card
                key={category.id}
                padding="lg"
                variant="elevated"
                className="group relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1.5 ${
                    TONE[category.tone] ?? "bg-organic-green"
                  }`}
                />
                <span className="text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-gray-300">
                  0{index + 1}
                </span>
                <CardTitle className="mt-3 mb-2">{category.name}</CardTitle>
                <p className="mb-4 inline-block rounded-full bg-pale-mint px-3 py-1 text-[10px] font-heading font-bold uppercase tracking-widest text-forest-green">
                  {category.count}
                </p>
                <CardDescription>{category.description}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Training process */}
      <section className="px-6 pb-28 bg-ivory lg:px-12 lg:pb-36">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-organic-green-dark">
              The method
            </span>
            <h2 className="mt-4 font-heading font-extrabold text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.02] tracking-tight text-forest-green">
              A simple path to progress
            </h2>
            <p className="mt-5 text-lg text-gray-600">
              Four steps, five minutes a day. Short, consistent sessions build
              habits that last a lifetime.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRAINING_STEPS.map((step) => (
              <div
                key={step.step}
                className="group relative rounded-[2rem] bg-white border border-gray-100 p-7 transition-all duration-300 hover:border-forest-green/30 hover:shadow-lg"
              >
                <span className="absolute -top-4 left-7 flex h-12 w-12 items-center justify-center rounded-full bg-organic-green font-heading font-extrabold text-xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                  {step.step}
                </span>
                <h3 className="mt-8 mb-2 font-heading font-bold text-lg text-gray-800">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Puppy to adult */}
      <section className="px-6 pb-28 bg-white lg:px-12 lg:pb-36">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-organic-green-dark">
              Grows with your dog
            </span>
            <h2 className="mt-4 font-heading font-extrabold text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.02] tracking-tight text-forest-green">
              From puppy to adult
            </h2>
            <p className="mt-5 text-lg text-gray-600">
              The same mat, a different curriculum. Watch the goals stretch as
              your dog matures.
            </p>
          </div>

          <div className="relative grid lg:grid-cols-3 gap-5">
            <div className="absolute left-0 right-0 top-9 hidden lg:block h-px bg-gradient-to-r from-organic-green/40 via-coral/40 to-forest-green/40" />
            {LEARNING_STAGES.map((stage) => {
              const isFinal = stage.focus === "Advanced skills";
              return (
                <div
                  key={stage.stage}
                  className={`relative rounded-[2rem] border p-8 transition-all duration-300 ${
                    isFinal
                      ? "bg-forest-green border-forest-green text-white shadow-xl lg:-translate-y-4"
                      : "bg-white border-gray-100 hover:border-forest-green/30 hover:shadow-lg"
                  }`}
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full font-heading font-extrabold text-lg ${
                      isFinal ? "bg-organic-green text-white" : "bg-pale-mint text-forest-green"
                    }`}
                  >
                    <PawPrint className="h-5 w-5" />
                  </span>
                  <h3
                    className={`mt-6 mb-1 font-heading font-extrabold text-xl ${
                      isFinal ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {stage.stage}
                  </h3>
                  <p
                    className={`mb-4 text-xs font-heading font-bold uppercase tracking-[0.16em] ${
                      isFinal ? "text-organic-green" : "text-forest-green"
                    }`}
                  >
                    {stage.focus}
                  </p>
                  <p
                    className={`text-sm leading-relaxed ${
                      isFinal ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    {stage.goal}. Zones in focus:{" "}
                    <span className="font-medium">
                      {stage.zones.join(", ").toUpperCase()}
                    </span>
                    .
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="px-6 pb-28 bg-ivory lg:px-12 lg:pb-36">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-6">
            <span className="text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-organic-green-dark">
              Product specification
            </span>
            <h2 className="mt-4 mb-10 font-heading font-extrabold text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.02] tracking-tight text-forest-green">
              Built to be used
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-10">
              {SPECIFICATIONS.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between gap-4 border-b border-gray-200/70 py-4"
                >
                  <span className="text-sm text-gray-500">{spec.label}</span>
                  <span className="text-right text-sm font-heading font-bold text-gray-800">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="rounded-[2.5rem] border-8 border-white shadow-xl overflow-hidden">
              <PolishedImage
                src="/images/products/zone-target.svg"
                alt="Target zone detail on the Pawpath mat"
                width={700}
                height={700}
                className="w-full aspect-square object-cover"
                placeholderColor="#fce7ec"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-28 bg-white lg:px-12 lg:pb-36">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-14">
            <span className="text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-organic-green-dark">
              Good to know
            </span>
            <h2 className="mt-4 font-heading font-extrabold text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.02] tracking-tight text-forest-green">
              Frequently asked
            </h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <Card
                key={faq.q}
                padding="lg"
                variant="outline"
                className="rounded-[1.75rem] border-gray-100 bg-white transition-colors hover:border-forest-green/25"
              >
                <CardTitle className="mb-2 font-heading font-bold text-lg text-gray-800">
                  {faq.q}
                </CardTitle>
                <CardDescription className="text-[15px]">{faq.a}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-20 lg:px-12 lg:pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-organic-green to-forest-green-dark text-white">
            <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-coral/20 blur-3xl" />
            <div className="relative p-8 sm:p-14 text-center">
              <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-[10px] font-heading font-bold uppercase tracking-[0.2em]">
                {TRAINING_ZONES.length} zones · 1 mat · 0 excuses
              </span>
              <h2 className="mt-6 font-heading font-extrabold text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.03] tracking-tight">
                Ready to teach your dog something new?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">
                Order the Pawpath Training Mat today and start your first milestone
                this week.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-white text-forest-green hover:bg-ivory"
                  asChild
                >
                  <Link href="/product/pawpath">
                    Shop the Mat — $149
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/product/pawpath#zones">Explore the zones</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
