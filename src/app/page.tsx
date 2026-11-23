"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  PawPrint,
  Trophy,
  Heart,
  Radio,
  X,
  Volume2,
  VolumeX,
  ChevronDown,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface ZoneData {
  id: string;
  number: string;
  name: string;
  headline: string;
  description: string;
  commands: string[];
  image: string;
  macroImage: string;
}

const ZONES_DATA: ZoneData[] = [
  {
    id: "target",
    number: "01",
    name: "THE TARGET ZONE",
    headline: "Tactile Target Touch",
    description:
      "A textured concentric target area that encourages dogs to touch a specific spot using their nose or paw. Develops laser focus and precision response.",
    commands: ["Touch", "Paw", "Target"],
    image: "/images/products/zone-target.webp",
    macroImage: "/images/products/zone-target.webp",
  },
  {
    id: "place",
    number: "02",
    name: "THE PLACE ZONE",
    headline: "Boundary & Settle Marker",
    description:
      "A designated tactile surface that helps dogs practise sitting, lying down, and settling calmly in one place. Creates an unmistakable boundary cue.",
    commands: ["Sit", "Down", "Place"],
    image: "/images/products/zone-place.webp",
    macroImage: "/images/products/zone-place.webp",
  },
  {
    id: "wait",
    number: "03",
    name: "THE WAIT ZONE",
    headline: "Impulse Control & Patience",
    description:
      "A dedicated area for practising patience, impulse control, and staying until released. Essential for front door manners and calm greetings.",
    commands: ["Wait", "Stay", "Release"],
    image: "/images/products/zone-wait.webp",
    macroImage: "/images/products/zone-wait.webp",
  },
  {
    id: "pathway",
    number: "04",
    name: "THE PATHWAY ZONE",
    headline: "Recall Runway & Direction",
    description:
      "Embossed pawstep patterns that encourage dogs to follow a route, move between points, and return reliably to their handler.",
    commands: ["Follow", "Come", "Return"],
    image: "/images/products/zone-pathway.webp",
    macroImage: "/images/products/zone-pathway.webp",
  },
  {
    id: "reward",
    number: "05",
    name: "THE REWARD ZONE",
    headline: "Positive Reinforcement Dock",
    description:
      "An integrated reward area that makes positive reinforcement part of the training flow. Connects successful cues with high-value treats.",
    commands: ["Reward", "Motivation", "Reinforce"],
    image: "/images/products/zone-reward.webp",
    macroImage: "/images/products/zone-reward.webp",
  },
];

interface HeroSlide {
  eyebrow: string;
  headlineStart: string;
  headlineMid: string;
  headlineAccent: string;
  description: string;
  ctaText: string;
  card: {
    zoneIndex: number;
    title: string;
    description: string;
    image: string;
  };
}

const HERO_SLIDES: HeroSlide[] = [
  {
    eyebrow: "MEET A BETTER KIND OF PLAYTIME",
    headlineStart: "Good dogs",
    headlineMid: "aren't born.",
    headlineAccent: "they learn.",
    description:
      "And every little lesson starts somewhere. Meet PAWPATH — a playful new way to turn everyday moments into meaningful learning experiences for your dog.",
    ctaText: "Discover PAWPATH",
    card: {
      zoneIndex: 0,
      title: "Target Zone",
      description: "Practise touch and paw commands.",
      image: "/images/products/zone-target.webp",
    },
  },
  {
    eyebrow: "FIVE INTEGRATED TRAINING ZONES",
    headlineStart: "Play is fun.",
    headlineMid: "Learning is",
    headlineAccent: "even better.",
    description:
      "From boundary patience to precision recall, each zone guides natural canine instincts into calm, confident manners without frustration.",
    ctaText: "Explore The Zones",
    card: {
      zoneIndex: 1,
      title: "Place Zone",
      description: "Practise sitting, down & settling.",
      image: "/images/products/zone-place.webp",
    },
  },
  {
    eyebrow: "DESIGNED FOR EVERY STAGE",
    headlineStart: "One mat.",
    headlineMid: "Countless",
    headlineAccent: "little victories.",
    description:
      "Designed by certified canine trainers to make positive reinforcement effortless, rewarding, and fun for puppies and adult dogs alike.",
    ctaText: "Shop PAWPATH",
    card: {
      zoneIndex: 3,
      title: "Pathway Zone",
      description: "Follow embossed steps & recall.",
      image: "/images/products/zone-pathway.webp",
    },
  },
];

const FAQS_DATA = [
  {
    question: "What makes PAWPATH different from a regular training mat or dog bed?",
    answer:
      "PAWPATH combines five specialized, permanently integrated tactile training zones into one cohesive system. Rather than juggling separate props for place training, target touches, wait/stay cues, and reward reinforcement, PAWPATH organizes everything into one structured learning space that dogs naturally recognize and look forward to.",
  },
  {
    question: "What age or breed is PAWPATH suitable for?",
    answer:
      "PAWPATH is designed for dogs of all breeds, sizes, and life stages — from 8-week-old puppies learning basic focus and target touches to senior dogs practicing gentle mobility, impulse control, and comforting routine settling.",
  },
  {
    question: "Is the mat durable, chew-resistant, and non-toxic?",
    answer:
      "Yes. PAWPATH is engineered from food-grade, heavy-duty, BPA-free vulcanized silicone and high-density non-slip natural rubber. It features beveled chew-discouraging borders, tear-resistant textures, and an ultra-grip underside that stays firmly planted on hardwood, tile, and carpet.",
  },
  {
    question: "How do I clean and maintain PAWPATH?",
    answer:
      "Daily care is effortless: simply wipe down with warm water and mild pet-safe soap, or rinse thoroughly under running water in the sink or garden hose. It is 100% waterproof and dishwasher-safe on the top rack.",
  },
  {
    question: "Do I need prior dog training experience to use it?",
    answer:
      "Not at all. Every PAWPATH mat includes our Illustrated Quickstart Guide with simple, step-by-step positive reinforcement exercises for each of the five zones. You also get digital access to our certified canine trainer video walkthroughs.",
  },
  {
    question: "What is your shipping and return policy?",
    answer:
      "We offer free express delivery across India (3–5 business days) and a 30-day risk-free trial. If PAWPATH doesn't transform your dog's training experience, return it for a full, hassle-free refund.",
  },
];

export default function HomePage() {
  const [activeZoneIndex, setActiveZoneIndex] = useState(0);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const desktopRunwayRef = useRef<HTMLDivElement>(null);
  const activeZone = ZONES_DATA[activeZoneIndex];
  const currentHeroSlide = HERO_SLIDES[activeHeroSlide];

  // Helper for smooth scrolling without adding #hash to route
  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Auto-advance hero slides gently every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // DESKTOP SCROLL-LOCKING FOR 5 ZONES:
  // The sticky container locks at the vertical center (below navbar) for 5 full scroll steps and unlocks once the 5th zone is completed.
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!desktopRunwayRef.current) {
            ticking = false;
            return;
          }

          const rect = desktopRunwayRef.current.getBoundingClientRect();
          const stickyOffset = 76; // Navbar clearance
          const totalScrollable = rect.height - window.innerHeight + stickyOffset;

          if (totalScrollable > 0) {
            const scrolledDistance = -rect.top + stickyOffset;

            if (scrolledDistance >= 0 && scrolledDistance <= totalScrollable) {
              const progress = Math.min(
                Math.max(scrolledDistance / totalScrollable, 0),
                0.999
              );
              const computedIndex = Math.min(
                Math.floor(progress * ZONES_DATA.length),
                ZONES_DATA.length - 1
              );
              setActiveZoneIndex(computedIndex);
            } else if (scrolledDistance < 0) {
              setActiveZoneIndex(0);
            } else if (scrolledDistance > totalScrollable) {
              setActiveZoneIndex(ZONES_DATA.length - 1);
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // SCROLL-TRIGGERED CREATIVE REVEAL ANIMATIONS:
  // Observes elements with .reveal-on-scroll, .scale-on-scroll, .reveal-from-left, .reveal-from-right
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    const elements = document.querySelectorAll(
      ".reveal-on-scroll, .scale-on-scroll, .reveal-from-left, .reveal-from-right"
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Smooth scroll to a specific zone within the desktop sticky runway
  const scrollToZone = (index: number) => {
    setActiveZoneIndex(index);
    if (!desktopRunwayRef.current) return;

    const rect = desktopRunwayRef.current.getBoundingClientRect();
    const stickyOffset = 76;
    const scrollTop = window.scrollY + rect.top - stickyOffset;
    const totalScrollable = rect.height - window.innerHeight + stickyOffset;
    const targetScroll =
      scrollTop + ((index + 0.5) / ZONES_DATA.length) * totalScrollable;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  const nextZone = () => {
    const nextIdx = (activeZoneIndex + 1) % ZONES_DATA.length;
    scrollToZone(nextIdx);
  };

  const prevZone = () => {
    const prevIdx =
      (activeZoneIndex - 1 + ZONES_DATA.length) % ZONES_DATA.length;
    scrollToZone(prevIdx);
  };

  return (
    <div className="bg-[#f7f5ee] text-[#123321] selection:bg-[#678a52]/20 selection:text-[#123321]">
      {/* =========================================================
          01. IMMERSIVE HERO — FIRST IMPRESSION (herobg cover)
          ========================================================= */}
      <section className="relative min-h-[820px] sm:min-h-[840px] lg:min-h-[860px] w-full flex items-center pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
        {/* Full Hero Background covering the section */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/products/herobg.webp"
            alt="Golden Retriever training on PAWPATH interactive mat in nature"
            fill
            priority
            className="object-cover object-[72%_18%] sm:object-[68%_center] lg:object-center transition-all duration-700"
          />
          {/* Reduced, subtle soft gradient in mobile so the dog and mat stay clear and vibrant */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#f7f5ee]/40 via-transparent to-[#f7f5ee]/15 sm:bg-gradient-to-r sm:from-[#f7f5ee]/90 sm:via-[#f7f5ee]/40 sm:to-transparent" />

          {/* Ambient drifting paw prints */}
          <div className="absolute top-28 left-8 sm:left-16 pointer-events-none text-[#123321]/15 animate-paw-drift hidden sm:block">
            <PawPrint className="w-10 h-10 rotate-12" />
          </div>
          <div className="absolute top-44 left-1/3 pointer-events-none text-[#123321]/10 animate-paw-drift-delayed hidden lg:block">
            <PawPrint className="w-8 h-8 -rotate-15" />
          </div>
        </div>

        {/* Content Container positioned cleanly over the background */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            {/* Left Column: Typography, Eyebrow & CTAs */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 lg:space-y-8">
              {/* Pill Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#e7ede4]/90 backdrop-blur-xs text-[#123321] text-[10px] sm:text-xs font-bold tracking-wide border border-[#d6dfd2] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#3d6848] animate-pulse" />
                <span>{currentHeroSlide.eyebrow}</span>
              </div>

              {/* Main Heading with dynamic slide cross-fade */}
              <div key={activeHeroSlide} className="transition-all duration-500 ease-out">
                <h1 className="font-heading text-3xl sm:text-5xl lg:text-[68px] font-black text-[#123321] leading-[1.08] tracking-tight">
                  {currentHeroSlide.headlineStart}
                  <br />
                  {currentHeroSlide.headlineMid}
                  <br />
                  <span className="italic font-serif text-[#5f8249] font-normal tracking-normal">
                    {currentHeroSlide.headlineAccent}
                  </span>
                </h1>

                {/* Supporting Text */}
                <p className="mt-3 sm:mt-5 text-xs sm:text-base text-[#123321]/85 leading-relaxed max-w-xs sm:max-w-md font-medium">
                  {currentHeroSlide.description}
                </p>
              </div>

              {/* CTA Buttons (Responsive layout) */}
              <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 max-w-xs sm:max-w-none">
                <Link
                  href="/product/pawpath"
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#123321] hover:bg-[#0b2416] text-white text-xs sm:text-sm font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer btn-shimmer text-center"
                >
                  <span>{currentHeroSlide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-[#9ec490]" />
                </Link>

                {/* Watch Video Demo Pill */}
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-4 rounded-full bg-white/85 hover:bg-white text-[#123321] border border-[#123321]/15 text-xs font-bold shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer backdrop-blur-xs text-center"
                >
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#123321] text-white flex items-center justify-center">
                    <Play className="w-2 h-2 sm:w-2.5 sm:h-2.5 fill-current ml-0.5" />
                  </div>
                  <span>Watch Demo (1 min)</span>
                </button>
              </div>

              {/* Slider Controls / "Slide Bar" & Scroll Prompt */}
              <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs text-[#123321]/70 font-semibold border-t border-[#123321]/15 max-w-md">
                {/* Active Slider Bar with dynamic segments */}
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="font-mono text-xs tracking-wider font-bold text-[#123321]">
                    0{activeHeroSlide + 1} — 0{HERO_SLIDES.length}
                  </span>

                  {/* 3 Interactive Slide Bar Segments */}
                  <div className="flex items-center gap-1.5" role="tablist" aria-label="Hero slides">
                    {HERO_SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveHeroSlide(idx)}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          activeHeroSlide === idx
                            ? "w-7 sm:w-8 bg-[#123321]"
                            : "w-2.5 sm:w-3 bg-[#123321]/20 hover:bg-[#123321]/40"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Arrow Buttons */}
                  <div className="flex items-center gap-1.5 ml-1">
                    <button
                      onClick={() =>
                        setActiveHeroSlide((prev) =>
                          prev > 0 ? prev - 1 : HERO_SLIDES.length - 1
                        )
                      }
                      className="w-7 h-7 rounded-full border border-[#123321]/20 bg-white/80 flex items-center justify-center hover:bg-white transition cursor-pointer shadow-xs active:scale-95"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 text-[#123321]" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length)
                      }
                      className="w-7 h-7 rounded-full border border-[#123321]/20 bg-white/80 flex items-center justify-center hover:bg-white transition cursor-pointer shadow-xs active:scale-95"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-[#123321]" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => scrollToElement("experience")}
                  className="text-[11px] text-[#123321]/70 hover:text-[#123321] transition inline-flex items-center gap-1 sm:pl-3 sm:border-l sm:border-[#123321]/20 cursor-pointer bg-transparent border-none p-0 text-left"
                >
                  <span>Scroll to explore</span>
                  <span>↓</span>
                </button>
              </div>
            </div>

            {/* Right Column: Floating interactive card (Desktop float / Mobile compact preview) */}
            <div className="lg:col-span-5 relative flex flex-col items-start lg:items-end lg:pr-6 space-y-3 pt-2 lg:pt-0">
              {/* Floating Dynamic Zone Card */}
              <div
                onClick={() => scrollToZone(currentHeroSlide.card.zoneIndex)}
                className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-xl border border-white/80 w-full sm:max-w-[280px] hover:scale-105 transition-all duration-300 group cursor-pointer animate-float"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl overflow-hidden relative flex-shrink-0 bg-[#0d3f29] shadow-inner">
                    <Image
                      src={currentHeroSlide.card.image}
                      alt={currentHeroSlide.card.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <h4 className="font-heading font-black text-xs sm:text-sm text-[#123321] group-hover:text-[#527741] transition">
                      {currentHeroSlide.card.title}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-[#123321]/70 leading-snug mt-0.5">
                      {currentHeroSlide.card.description}
                    </p>
                    <span className="text-[10px] font-bold text-[#123321] mt-1 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Explore Zone →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-3xl bg-[#123321] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/20">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <PawPrint className="w-5 h-5 text-[#9ec490]" />
                <span className="font-heading font-black text-sm tracking-wide">
                  PAWPATH In Action • Interactive Overview
                </span>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition cursor-pointer"
                aria-label="Close video modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video / Visual Simulation Area */}
            <div className="relative aspect-[16/9] w-full bg-[#0a1f14] overflow-hidden flex items-center justify-center">
              <Image
                src="/images/products/herobg.webp"
                alt="PAWPATH mat demonstration"
                fill
                className="object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              {/* Center Play Graphic */}
              <div className="relative z-10 text-center space-y-3 px-6">
                <div className="w-16 h-16 rounded-full bg-[#9ec490] text-[#123321] flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
                <h3 className="font-heading font-black text-lg sm:text-2xl text-white">
                  Five Zones. One Simple Habit.
                </h3>
                <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto">
                  Watch a 60-second walkthrough showing how puppies and adult dogs learn touch, place, stay and recall on PAWPATH.
                </p>
              </div>

              {/* Sound toggle button */}
              <button
                onClick={() => setVideoMuted(!videoMuted)}
                className="absolute bottom-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition cursor-pointer"
                aria-label={videoMuted ? "Unmute video" : "Mute video"}
              >
                {videoMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Modal Footer with quick chapter links */}
            <div className="p-4 sm:p-5 bg-[#0f291b] flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-white/60 font-mono">CHAPTERS:</span>
              <div className="flex flex-wrap items-center gap-2">
                {ZONES_DATA.map((z, idx) => (
                  <button
                    key={z.id}
                    onClick={() => {
                      setIsVideoModalOpen(false);
                      scrollToZone(idx);
                    }}
                    className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-[#9ec490] hover:text-[#123321] text-white/80 transition cursor-pointer text-[11px] font-semibold"
                  >
                    {z.number} {z.name.replace("THE ", "")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          02. BRAND PHILOSOPHY — MORE THAN PLAYTIME
          ========================================================= */}
      <section id="experience" className="py-14 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Asymmetrical Arch Pill Image (Living Room Lifestyle) */}
          <div className="lg:col-span-6 relative scale-on-scroll">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-[36px] sm:rounded-[48px] overflow-hidden shadow-xl border border-[#e2e9de] bg-[#eef3eb] group">
              <Image
                src="/images/products/dog-lifestyle.webp"
                alt="Dog ready for a training session in a modern home"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right: Editorial Message */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 reveal-on-scroll">
            {/* Decorative hand-drawn sparks with wobble animation */}
            <div className="text-[#678a52] text-xl font-bold select-none opacity-85 animate-doodle inline-flex items-center gap-1.5">
              <span>\</span>
              <span>|</span>
              <span>/</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl lg:text-[54px] font-black text-[#123321] leading-[1.12] tracking-tight">
              Play is fun.<br />
              Learning is<br />
              <span className="italic font-serif text-[#678a52] font-normal tracking-normal">
                even better.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#123321]/80 leading-relaxed font-normal">
              Every dog has something new to discover. A little patience, a simple command,
              a small achievement — these moments build confidence, encourage good habits,
              and make the bond between you and your dog even stronger.
            </p>

            <p className="text-sm sm:text-base text-[#123321]/80 leading-relaxed font-normal">
              Because the best habits are built through little moments, everyday practice and a
              whole lot of tail wags. PAWPATH brings these little lessons into everyday play.
            </p>

            <div className="pt-2">
              <Link
                href="/product/pawpath"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#123321] hover:text-[#527741] transition group cursor-pointer"
              >
                <span>Explore the Experience</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#678a52]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          03. PRODUCT REVEAL — MEET PAWPATH
          ========================================================= */}
      <section className="py-14 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Product Overview Copy */}
          <div className="lg:col-span-5 space-y-6 reveal-on-scroll">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e7ede4] text-[#123321] text-[11px] sm:text-xs font-bold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#3d6848]" />
              <span>ONE PRODUCT. MANY POSSIBILITIES.</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-black text-[#123321] leading-[1.12] tracking-tight">
              Meet their new favourite classroom.
            </h2>

            <p className="text-sm sm:text-base text-[#123321]/75 leading-relaxed font-normal">
              One thoughtfully designed mat. Five interactive zones. Countless little opportunities
              to learn. From learning where to sit to practising patience and following simple
              patterns, PAWPATH makes everyday training more engaging.
            </p>

            <div className="pt-2">
              <button
                onClick={() => scrollToElement("five-zones")}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#123321] hover:bg-[#0b2416] text-white text-xs sm:text-sm font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Explore the Five Zones</span>
                <ArrowRight className="w-4 h-4 text-[#9ec490]" />
              </button>
            </div>
          </div>

          {/* Right: Floating Mat Flagship 3D Render */}
          <div className="lg:col-span-7 relative scale-on-scroll stagger-1">
            <div className="relative aspect-[16/10] w-full rounded-[36px] sm:rounded-[48px] overflow-hidden flex items-center justify-center p-4">
              <Image
                src="/images/products/hero.webp"
                alt="PAWPATH Interactive Dog Training Mat 3D Perspective Render"
                fill
                className="object-contain hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          04. FIVE LITTLE ZONES — CENTER-LOCKED WITH MARGINS & NAVBAR CLEARANCE
          ========================================================= */}
      <section id="five-zones" className="my-14 sm:my-20 lg:my-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* DESKTOP VIEW: STICKY SCROLL LOCK CENTERED IN VIEWPORT (hidden md:block) */}
        <div ref={desktopRunwayRef} className="relative hidden md:block h-[380vh] w-full">
          {/* Sticky container that locks in the vertical center safely below navbar */}
          <div className="sticky top-[80px] h-[calc(100vh-96px)] w-full flex items-center justify-center">
            <div className="w-full bg-[#123321] text-white rounded-[36px] lg:rounded-[44px] p-6 lg:p-8 shadow-2xl border border-white/10 flex flex-col justify-between">
              {/* Header Row */}
              <div className="flex items-center justify-between gap-6 pb-4 border-b border-white/10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#9ec490] text-xs font-bold tracking-wider mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#9ec490] animate-pulse" />
                    <span>FIVE PHYSICAL TRAINING ZONES • SCROLL-LOCKED TOUR</span>
                  </div>
                  <h2 className="font-heading text-2xl lg:text-4xl font-black text-white leading-tight tracking-tight">
                    A whole lot{" "}
                    <span className="italic font-serif text-[#9ec490] font-normal">
                      to learn.
                    </span>
                  </h2>
                </div>

                {/* Progress & Pagination Controls */}
                <div className="flex items-center gap-4">
                  {/* Step Progress Bar */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-28 lg:w-36 h-2 bg-white/15 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#9ec490] transition-all duration-300 ease-out rounded-full"
                        style={{
                          width: `${((activeZoneIndex + 1) / ZONES_DATA.length) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="font-mono text-xs text-white/80 tracking-widest font-bold">
                      {activeZone.number} / 05
                    </span>
                  </div>

                  {/* Arrows */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={prevZone}
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/15 transition cursor-pointer active:scale-95"
                      aria-label="Previous zone"
                    >
                      <ChevronLeft className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={nextZone}
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/15 transition cursor-pointer active:scale-95"
                      aria-label="Next zone"
                    >
                      <ChevronRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Interactive Zone Tabs */}
              <div className="flex items-center gap-2 py-3">
                {ZONES_DATA.map((z, idx) => (
                  <button
                    key={z.id}
                    onClick={() => scrollToZone(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                      activeZoneIndex === idx
                        ? "bg-[#9ec490] text-[#123321] shadow-lg scale-105"
                        : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    {z.number} {z.name.replace("THE ", "")}
                  </button>
                ))}
              </div>

              {/* Main Showcase Grid */}
              <div className="grid grid-cols-12 gap-6 lg:gap-8 items-center py-2">
                {/* Left: Cinematic Macro Photograph */}
                <div className="col-span-7 relative">
                  <div className="relative aspect-[16/10] max-h-[360px] w-full rounded-[28px] overflow-hidden bg-[#092215] border border-white/15 shadow-2xl">
                    <Image
                      key={activeZone.id}
                      src={activeZone.macroImage}
                      alt={activeZone.name}
                      fill
                      className="object-cover object-center transition-all duration-700 animate-fade-in"
                    />
                    <div className="absolute top-3.5 left-3.5 bg-black/55 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] text-white font-mono font-bold border border-white/15 flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-radar absolute inline-flex h-full w-full rounded-full bg-[#9ec490] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9ec490]"></span>
                      </span>
                      <span>ZONE {activeZone.number} • {activeZone.headline}</span>
                    </div>
                  </div>
                </div>

                {/* Right: High-contrast White Editorial Card */}
                <div className="col-span-5">
                  <div
                    key={activeZone.id}
                    className="bg-white text-[#123321] rounded-[28px] p-6 lg:p-7 shadow-2xl space-y-3.5 border border-white/90"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden relative flex-shrink-0 bg-[#e7ede4] border border-[#d8e0d4] shadow-xs">
                        <Image
                          src={activeZone.image}
                          alt={activeZone.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold tracking-wider text-[#678a52] uppercase block">
                          ZONE {activeZone.number} OF 05
                        </span>
                        <h3 className="font-heading font-black text-lg lg:text-xl text-[#123321]">
                          {activeZone.name}
                        </h3>
                      </div>
                    </div>

                    <h4 className="font-heading font-bold text-xs lg:text-sm text-[#3d6848]">
                      {activeZone.headline}
                    </h4>

                    <p className="text-xs lg:text-sm text-[#123321]/80 leading-relaxed font-normal">
                      {activeZone.description}
                    </p>

                    {/* Commands Pill Badges */}
                    <div className="pt-1.5 border-t border-[#123321]/10">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#123321]/60 block mb-1.5">
                        Training Commands
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {activeZone.commands.map((cmd) => (
                          <span
                            key={cmd}
                            className="px-2.5 py-1 rounded-full bg-[#f0f4ee] text-[#123321] text-xs font-bold border border-[#dce4d8] shadow-2xs hover:bg-[#e4ece0] transition-all cursor-default"
                          >
                            {cmd}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Link to Full Product */}
                    <div className="pt-1">
                      <Link
                        href="/product/pawpath"
                        className="text-xs font-bold text-[#123321] hover:text-[#527741] inline-flex items-center gap-1.5 transition group"
                      >
                        <span>View Zone {activeZone.number} Training Routine</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#678a52]" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Hint */}
              <div className="pt-2 text-center text-[11px] text-white/50 tracking-wider">
                {activeZoneIndex < 4 ? (
                  <span>
                    ↓ Scroll down to reveal next zone ({activeZoneIndex + 1} of 5)
                  </span>
                ) : (
                  <span className="text-[#9ec490] font-semibold">
                    ✓ All 5 zones viewed • Continue scrolling down to unlock next section ↓
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE VIEW: VERTICAL STACK (md:hidden) — NO LOCKING */}
        <div className="md:hidden bg-[#123321] text-white rounded-[32px] p-6 shadow-xl space-y-6">
          <div className="reveal-on-scroll">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#9ec490] text-[10px] font-bold tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#9ec490]" />
              <span>FIVE LITTLE ZONES</span>
            </div>
            <h2 className="font-heading text-2xl font-black text-white leading-tight">
              A whole lot to learn.
            </h2>
            <p className="mt-1 text-xs text-white/70">
              Five dedicated tactile zones designed to turn everyday play into meaningful canine learning.
            </p>
          </div>

          {/* Stacked Zone Cards */}
          <div className="space-y-5">
            {ZONES_DATA.map((z, idx) => (
              <div
                key={z.id}
                className={`bg-white text-[#123321] rounded-2xl p-5 shadow-lg border border-white/90 space-y-3.5 reveal-on-scroll stagger-${(idx % 4) + 1}`}
              >
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#092215]">
                  <Image
                    src={z.macroImage}
                    alt={z.name}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-[#123321]/90 backdrop-blur-xs text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-white/20">
                    ZONE {z.number}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono font-bold text-[#678a52] uppercase block">
                    {z.headline}
                  </span>
                  <h3 className="font-heading font-black text-base text-[#123321] mt-0.5">
                    {z.name}
                  </h3>
                  <p className="text-xs text-[#123321]/80 leading-relaxed mt-1">
                    {z.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#123321]/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#123321]/60 block mb-1.5">
                    Training Commands
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {z.commands.map((cmd) => (
                      <span
                        key={cmd}
                        className="px-2.5 py-1 rounded-full bg-[#f0f4ee] text-[#123321] text-xs font-bold border border-[#dce4d8]"
                      >
                        {cmd}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          05. LEARNING JOURNEY — EVERY DOG HAS A NEXT STEP
          ========================================================= */}
      <section id="learning-journey" className="py-14 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Heading & Intro */}
          <div className="lg:col-span-4 space-y-5 reveal-on-scroll">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e7ede4] text-[#123321] text-[11px] sm:text-xs font-bold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#3d6848]" />
              <span>THE LEARNING JOURNEY</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-black text-[#123321] leading-tight tracking-tight">
              Little steps.<br />
              Big personalities.
            </h2>

            <p className="text-sm text-[#123321]/75 leading-relaxed font-normal">
              From curious puppy to well-mannered companion, PAWPATH grows with them.
              Every dog learns at their own pace, and PAWPATH gives you a dedicated space
              to practise throughout their learning journey.
            </p>

            <div className="pt-2">
              <Link
                href="/product/pawpath"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#eef3eb] text-[#123321] border border-[#d8e0d4] text-xs font-bold transition shadow-xs hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>See the Journey</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#678a52]" />
              </Link>
            </div>
          </div>

          {/* Right Column: 3 Horizontal Stage Cards Connected by Dotted Track Line */}
          <div className="lg:col-span-8 relative">
            <div className="hidden md:block absolute top-[90px] left-8 right-8 border-t-2 border-dashed border-[#d8e2d4] z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {/* Stage 01: The Beginner */}
              <div className="bg-white rounded-3xl p-5 border border-[#e2e9de] shadow-xs hover:shadow-md transition space-y-3 group hover:-translate-y-1 duration-300 reveal-on-scroll stagger-1">
                <span className="text-[10px] font-bold text-[#123321]/70 bg-[#f0f4ee] px-2.5 py-1 rounded-full uppercase tracking-wider inline-block">
                  01 — THE BEGINNER
                </span>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative bg-[#eef3eb]">
                  <Image
                    src="/images/products/stage-puppy.webp"
                    alt="Puppy starting with simple target commands on PAWPATH"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-heading font-black text-sm text-[#123321]">
                  Every adventure starts somewhere.
                </h3>
                <p className="text-xs text-[#123321]/70 leading-relaxed font-normal">
                  Introduce simple interactions such as touching a target, recognising their place, and responding to basic cues.
                </p>
              </div>

              {/* Stage 02: The Learner */}
              <div className="bg-white rounded-3xl p-5 border border-[#e2e9de] shadow-xs hover:shadow-md transition space-y-3 group hover:-translate-y-1 duration-300 reveal-on-scroll stagger-2">
                <span className="text-[10px] font-bold text-[#123321]/70 bg-[#f0f4ee] px-2.5 py-1 rounded-full uppercase tracking-wider inline-block">
                  02 — THE LEARNER
                </span>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative bg-[#eef3eb]">
                  <Image
                    src="/images/products/stage-learner.webp"
                    alt="Adolescent Golden Retriever practising waiting and pattern following on PAWPATH"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-heading font-black text-sm text-[#123321]">
                  Building confidence, one lesson at a time.
                </h3>
                <p className="text-xs text-[#123321]/70 leading-relaxed font-normal">
                  Practise waiting, staying, following directions and responding to familiar cues with consistency.
                </p>
              </div>

              {/* Stage 03: The Well-Mannered */}
              <div className="bg-white rounded-3xl p-5 border border-[#e2e9de] shadow-xs hover:shadow-md transition space-y-3 group hover:-translate-y-1 duration-300 reveal-on-scroll stagger-3">
                <span className="text-[10px] font-bold text-[#123321]/70 bg-[#f0f4ee] px-2.5 py-1 rounded-full uppercase tracking-wider inline-block">
                  03 — THE WELL-MANNERED
                </span>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative bg-[#eef3eb]">
                  <Image
                    src="/images/products/stage-adult.webp"
                    alt="Adult dog settled comfortably with good habits on PAWPATH"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-heading font-black text-sm text-[#123321]">
                  Good habits become second nature.
                </h3>
                <p className="text-xs text-[#123321]/70 leading-relaxed font-normal">
                  Reinforce familiar commands, settling behaviours, impulse control and everyday routines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          06. HOW IT WORKS — SIMPLE LESSONS, HAPPY TAILS
          ========================================================= */}
      <section id="how-it-works" className="py-14 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading & Intro */}
          <div className="lg:col-span-4 space-y-5 reveal-on-scroll">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e7ede4] text-[#123321] text-[11px] sm:text-xs font-bold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#3d6848]" />
              <span>HOW IT WORKS</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-black text-[#123321] leading-tight tracking-tight">
              Less complicated.<br />
              More tail wags.
            </h2>

            <p className="text-sm text-[#123321]/75 leading-relaxed font-normal">
              Four simple steps to better behaviour. No complicated setup, just you,
              your dog and a little consistency.
            </p>

            <div className="pt-2">
              <Link
                href="/product/pawpath"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#123321] hover:bg-[#0b2416] text-white text-xs sm:text-sm font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>See How It Works</span>
                <ArrowRight className="w-4 h-4 text-[#9ec490]" />
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Steps Connected by Dotted Trail */}
          <div className="lg:col-span-8 relative">
            <div className="hidden md:block absolute top-[36px] left-10 right-10 border-t-2 border-dashed border-[#d8e2d4] z-0" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
              {/* Step 01 */}
              <div className="flex flex-col items-center text-center space-y-3 group reveal-on-scroll stagger-1">
                <div className="w-16 h-16 rounded-full bg-white border border-[#d8e0d4] flex items-center justify-center text-[#123321] shadow-xs group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                  <PawPrint className="w-6 h-6 text-[#123321]" />
                </div>
                <div>
                  <span className="font-heading font-black text-sm text-[#123321] block">
                    01. Choose
                  </span>
                  <span className="text-xs text-[#123321]/70 font-medium">a lesson</span>
                </div>
                <p className="text-[11px] text-[#123321]/60 leading-relaxed font-normal">
                  Pick a zone and decide what you want your dog to practise.
                </p>
              </div>

              {/* Step 02 */}
              <div className="flex flex-col items-center text-center space-y-3 group reveal-on-scroll stagger-2">
                <div className="w-16 h-16 rounded-full bg-white border border-[#d8e0d4] flex items-center justify-center text-[#123321] shadow-xs group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                  <Radio className="w-6 h-6 text-[#123321]" />
                </div>
                <div>
                  <span className="font-heading font-black text-sm text-[#123321] block">
                    02. Give
                  </span>
                  <span className="text-xs text-[#123321]/70 font-medium">the cue</span>
                </div>
                <p className="text-[11px] text-[#123321]/60 leading-relaxed font-normal">
                  Use a simple verbal command or gesture to guide your dog.
                </p>
              </div>

              {/* Step 03 */}
              <div className="flex flex-col items-center text-center space-y-3 group reveal-on-scroll stagger-3">
                <div className="w-16 h-16 rounded-full bg-white border border-[#d8e0d4] flex items-center justify-center text-[#123321] shadow-xs group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                  <Trophy className="w-6 h-6 text-[#123321]" />
                </div>
                <div>
                  <span className="font-heading font-black text-sm text-[#123321] block">
                    03. Reward
                  </span>
                  <span className="text-xs text-[#123321]/70 font-medium">the action</span>
                </div>
                <p className="text-[11px] text-[#123321]/60 leading-relaxed font-normal">
                  Celebrate the correct response with a treat, praise, or affection.
                </p>
              </div>

              {/* Step 04 */}
              <div className="flex flex-col items-center text-center space-y-3 group reveal-on-scroll stagger-4">
                <div className="w-16 h-16 rounded-full bg-white border border-[#d8e0d4] flex items-center justify-center text-[#123321] shadow-xs group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                  <Heart className="w-6 h-6 text-[#123321]" />
                </div>
                <div>
                  <span className="font-heading font-black text-sm text-[#123321] block">
                    04. Repeat &amp;
                  </span>
                  <span className="text-xs text-[#123321]/70 font-medium">progress</span>
                </div>
                <p className="text-[11px] text-[#123321]/60 leading-relaxed font-normal">
                  Practise regularly, build consistency, and introduce new challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          07. PRODUCT DETAILS — THOUGHTFULLY DESIGNED
          ========================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="bg-white rounded-[36px] sm:rounded-[48px] p-8 sm:p-14 border border-[#e2e9de] shadow-sm">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 reveal-on-scroll">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e7ede4] text-[#123321] text-[11px] sm:text-xs font-bold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#3d6848]" />
              <span>THOUGHTFULLY DESIGNED.</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-black text-[#123321] tracking-tight">
              Down to the last pawprint.
            </h2>

            <p className="text-sm sm:text-base text-[#123321]/75 leading-relaxed font-normal">
              Every detail of PAWPATH is designed to make learning feel natural. From tactile
              surfaces that encourage interaction to clearly defined activity zones, the mat brings
              multiple training exercises together in one integrated design.
            </p>
          </div>

          {/* 4 Feature Callouts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-[#f7f5ee] border border-[#e4eae0] space-y-2.5 hover:shadow-md transition-shadow scale-on-scroll stagger-1">
              <span className="w-7 h-7 rounded-full bg-[#123321] text-white flex items-center justify-center text-xs font-bold font-mono">
                01
              </span>
              <h3 className="font-heading font-black text-sm text-[#123321] uppercase tracking-wide">
                One Integrated Design
              </h3>
              <p className="text-xs text-[#123321]/70 leading-relaxed font-normal">
                Five activity zones brought together in a single cohesive training mat.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#f7f5ee] border border-[#e4eae0] space-y-2.5 hover:shadow-md transition-shadow scale-on-scroll stagger-2">
              <span className="w-7 h-7 rounded-full bg-[#123321] text-white flex items-center justify-center text-xs font-bold font-mono">
                02
              </span>
              <h3 className="font-heading font-black text-sm text-[#123321] uppercase tracking-wide">
                Tactile Surfaces
              </h3>
              <p className="text-xs text-[#123321]/70 leading-relaxed font-normal">
                Different surface patterns and concentric textures to distinguish individual activities.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#f7f5ee] border border-[#e4eae0] space-y-2.5 hover:shadow-md transition-shadow scale-on-scroll stagger-3">
              <span className="w-7 h-7 rounded-full bg-[#123321] text-white flex items-center justify-center text-xs font-bold font-mono">
                03
              </span>
              <h3 className="font-heading font-black text-sm text-[#123321] uppercase tracking-wide">
                Thoughtful Details
              </h3>
              <p className="text-xs text-[#123321]/70 leading-relaxed font-normal">
                Defined zones, beveled rounded edges, and a clean, safe, dog-friendly design.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#f7f5ee] border border-[#e4eae0] space-y-2.5 hover:shadow-md transition-shadow scale-on-scroll stagger-4">
              <span className="w-7 h-7 rounded-full bg-[#123321] text-white flex items-center justify-center text-xs font-bold font-mono">
                04
              </span>
              <h3 className="font-heading font-black text-sm text-[#123321] uppercase tracking-wide">
                Everyday Learning
              </h3>
              <p className="text-xs text-[#123321]/70 leading-relaxed font-normal">
                A dedicated, positive space for practising little lessons together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          08. FREQUENTLY ASKED QUESTIONS (FAQ SECTION)
          ========================================================= */}
      <section id="faq" className="py-14 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto overflow-hidden">
        <div className="text-center space-y-4 mb-12 sm:mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e7ede4] text-[#123321] text-[11px] sm:text-xs font-bold tracking-wide shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#3d6848]" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-black text-[#123321] tracking-tight">
            Everything you need to know.
          </h2>

          <p className="text-sm sm:text-base text-[#123321]/75 leading-relaxed font-normal max-w-xl mx-auto">
            Have questions about PAWPATH, training methods, materials, or shipping? Here are the answers to our most common queries.
          </p>
        </div>

        {/* Accordion FAQ Items with Smooth Grid Transitions */}
        <div className="space-y-4">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white rounded-3xl border border-[#e2e9de] overflow-hidden shadow-xs transition-all duration-300 hover:border-[#123321]/30 reveal-on-scroll stagger-${(idx % 4) + 1}`}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-7 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-black text-sm sm:text-base text-[#123321] leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border border-[#e2e9de] flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isOpen ? "bg-[#123321] text-white rotate-180" : "bg-[#f7f5ee] text-[#123321]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Smooth Animated Accordion Height */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 sm:px-7 sm:pb-7 text-xs sm:text-sm text-[#123321]/80 leading-relaxed font-normal border-t border-[#f0f4ee] pt-3.5">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-12 text-center p-6 sm:p-8 rounded-3xl bg-[#eef3eb] border border-[#dce5d9] max-w-xl mx-auto space-y-2 reveal-on-scroll">
          <p className="font-heading font-black text-sm text-[#123321]">
            Still have questions?
          </p>
          <p className="text-xs text-[#123321]/70 leading-relaxed">
            Our certified canine trainer support team is here to assist with exercises, sizing, and advice.
          </p>
          <div className="pt-2">
            <Link
              href="/product/pawpath"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#123321] hover:text-[#527741] transition"
            >
              <span>Explore full product specifications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          09. FINAL BRAND STATEMENT — EVERY PAWSTEP COUNTS (lastbg cover)
          ========================================================= */}
      <section className="py-10 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="relative rounded-[32px] sm:rounded-[48px] p-6 sm:p-14 lg:p-16 pt-48 sm:pt-14 overflow-hidden shadow-2xl min-h-[480px] sm:min-h-[440px] lg:min-h-[480px] flex items-end sm:items-center">
          {/* Cover background: lastbg.webp */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/products/lastbg.webp"
              alt="Joyful Golden Retriever and PAWPATH interactive mat"
              fill
              className="object-cover object-[24%_25%] sm:object-center"
            />
            {/* Subtle gradient ensuring smiling dog is visible in top half on mobile, text readable below */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#123321]/95 via-[#123321]/55 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-[#123321]/40 sm:to-[#123321]/90" />
          </div>

          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Left space for the smiling dog in lastbg */}
            <div className="hidden lg:block lg:col-span-5" />

            {/* Right: Headline, Description & Direct Purchase CTA */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-white text-left lg:pl-6 reveal-on-scroll">
              <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                Every pawstep<br />
                counts.
              </h2>

              <p className="text-xs sm:text-base text-white/90 leading-relaxed font-normal max-w-lg">
                Make room for more than playtime. Make room for progress, little victories,
                and a whole lot of tail wags. Their next big lesson starts here.
              </p>

              <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/product/pawpath"
                  className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-full bg-[#123321] hover:bg-[#0c2417] text-white text-xs sm:text-sm font-bold border border-white/30 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer btn-shimmer"
                >
                  <span>Get Your PAWPATH</span>
                  <ArrowRight className="w-4 h-4 text-[#9ec490]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
