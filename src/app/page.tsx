import Link from "next/link";
import { ArrowRight, PawPrint, Play, Check, Target, LayoutGrid, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { PolishedImage } from "@/components/polished-image";
import { Header } from "@/components/header";
import Footer from "@/components/footer";
import {
  TRAINING_ZONES,
  TRAINING_STEPS,
  LEARNING_STAGES,
  SPECIFICATIONS,
  FAQS,
} from "@/lib/products";

export const metadata = {
  title: "Pawpath — Every pawstep learns something.",
  description: "Premium all-in-one interactive dog training mat. Playtime with a little more purpose.",
};

export default function HomePage() {
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden bg-ivory">
      <Header />

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-32 lg:px-12 lg:pt-32 lg:pb-40">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:pl-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-organic-green text-white text-xs font-heading font-semibold uppercase tracking-widest">
                New collection
              </div>
              <h1 className="font-heading font-bold text-[5rem] leading-[0.9] tracking-tighter text-forest-green mb-4">
                PAWPATH
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Every pawstep learns something. The all-in-one interactive training
                mat that turns playtime into purpose.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/product/pawpath">Shop the Mat</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/product/pawpath">
                    <Play className="h-4 w-4 mr-2" /> Watch Film
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400 font-heading uppercase tracking-widest mt-8">
                <span className="flex items-center gap-1">
                  <PawPrint className="h-3 w-3 fill-current" /> Free shipping
                </span>
                <span className="flex items-center gap-1">
                  <ArrowRight className="h-3 w-3 fill-current" /> 30-day guarantee
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-organic-green/10 rounded-[3rem] blur-3xl" />
              <PolishedImage
                src="/images/products/hero.svg"
                alt="Pawpath training mat with golden retriever"
                width={800}
                height={800}
                className="relative rounded-[3rem] border-4 border-white shadow-2xl"
                placeholderColor="#dcfce7"
                priority
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100 animate-pulse-slow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pale-mint flex items-center justify-center">
                    <PawPrint className="h-5 w-5 text-forest-green" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">4.9/5</p>
                    <p className="text-xs text-gray-500">12,000+ reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand storytelling */}
      <section className="px-6 pb-24 lg:px-12 lg:pb-32 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-pale-mint rounded-full blur-2xl" />
              <PolishedImage
                src="/images/products/lifestyle.svg"
                alt="Golden retriever playing on Pawpath mat"
                width={700}
                height={700}
                className="relative rounded-[2.5rem] shadow-xl border-8 border-white"
                placeholderColor="#f0fdfa"
                priority
              />
            </div>
            <div className="order-1 lg:order-2 space-y-8 lg:pl-12">
              <h2 className="font-heading font-bold text-[3rem] leading-[1.1] text-forest-green">
                Playtime with a little more purpose
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Pawpath was built on one simple idea: every moment your dog spends
                playing is an opportunity to learn. We designed a single mat that
                grows with your dog — from curious puppy to confident adult — so
                training fits naturally into your daily routine.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0 text-forest-green">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Five built-in learning zones</p>
                    <p className="text-sm text-gray-500">
                      Target, place, wot, pathway, reward — permanently integrated.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0 text-forest-green">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Designed for every life stage</p>
                    <p className="text-sm text-gray-500">
                      Puppy foundations to adult mastery, all on one mat.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center shrink-0 text-forest-green">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Premium, pet-safe materials</p>
                    <p className="text-sm text-gray-500">
                      Non-toxic TPE surface with natural rubber backing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product showcase */}
      <section className="px-6 pb-32 lg:px-12 lg:pb-40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pale-mint text-forest-green text-xs font-heading font-semibold uppercase tracking-widest">
              Featured product
            </span>
            <h2 className="font-heading font-bold text-[3rem] leading-[1.1] text-forest-green mt-4">
              One mat. Many milestones.
            </h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Nine hundred by sixty centimetres of purposeful play. One integrated
              mat, five permanent zones, infinite learning.
            </p>
          </div>
          <PolishedImage
            src="/images/products/hero.svg"
            alt="Pawpath training mat full view"
            width={1000}
            height={600}
            className="mx-auto rounded-[2.5rem] shadow-2xl border border-gray-100"
            placeholderColor="#dcfce7"
          />
        </div>
      </section>

      {/* Training zones */}
      <section className="px-6 pb-32 bg-ivory lg:px-12 lg:pb-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-start mb-16">
            <div className="flex-shrink-0">
              <span className="inline-block px-3 py-1 rounded-full bg-forest-green text-white text-[10px] font-heading font-bold uppercase tracking-widest mb-4">
                The five zones
              </span>
              <h2 className="font-heading font-bold text-[3rem] leading-[1.1] text-forest-green">
                Five zones. One purpose.
              </h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TRAINING_ZONES.map((zone) => (
              <Card
                key={zone.id}
                variant="elevated"
                padding="lg"
                className={`group relative overflow-hidden ${zone.color}/10 border border-gray-100/50 hover:border-forest-green/30 transition-all`}
              >
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  {zone.icon === "Target" && <Target className="h-5 w-5 text-forest-green" />}
                  {zone.icon === "LayoutGrid" && <LayoutGrid className="h-5 w-5 text-forest-green" />}
                  {zone.icon === "Clock" && <Clock className="h-5 w-5 text-forest-green" />}
                  {zone.icon === "ArrowRight" && <ArrowRight className="h-5 w-5 text-coral" />}
                  {zone.icon === "Heart" && <Heart className="h-5 w-5 text-organic-green" />}
                </div>
                <CardTitle className="mb-2">{zone.title}</CardTitle>
                <CardDescription>{zone.description}</CardDescription>
                <Link
                  href="/product/pawpath"
                  className="mt-6 inline-flex items-center gap-1 text-forest-green font-medium text-sm hover:gap-2 transition-colors"
                >
                  Explore zone <ArrowRight className="h-3 w-3" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Training process */}
      <section className="px-6 pb-32 lg:px-12 lg:pb-40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-[3rem] leading-[1.1] text-forest-green">
              A simple path to progress
            </h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Four steps, every day. Short sessions build lasting habits.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {TRAINING_STEPS.map((step) => (
              <Card key={step.step} padding="md" className="text-center border border-gray-100 bg-white">
                <div className="w-12 h-12 rounded-full bg-pale-mint flex items-center justify-center mx-auto mb-6 text-forest-green font-heading font-bold text-2xl">
                  {step.step}
                </div>
                <CardTitle className="mb-2">{step.title}</CardTitle>
                <CardDescription>{step.body}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning stages */}
      <section className="px-6 pb-32 bg-ivory lg:px-12 lg:pb-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-start mb-16">
            <div className="flex-shrink-0">
              <span className="inline-block px-3 py-1 rounded-full bg-forest-green text-white text-[10px] font-heading font-bold uppercase tracking-widest mb-4">
                Grows with your dog
              </span>
              <h2 className="font-heading font-bold text-[3rem] leading-[1.1] text-forest-green">
                From puppy to adult
              </h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {LEARNING_STAGES.map((stage) => (
              <Card
                key={stage.stage}
                padding="lg"
                className={`border border-gray-100 bg-white ${stage.focus === "Advanced skills" ? "border-forest-green/30 bg-forest-green/5" : ""}`}
              >
                <CardTitle className="mb-2">{stage.stage}</CardTitle>
                <p className="text-sm font-medium text-forest-green mb-3">
                  {stage.focus}
                </p>
                <CardDescription>
                  {stage.goal}. Zones:{" "}
                  {stage.zones.join(", ").toUpperCase()}.
                </CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="px-6 pb-32 lg:px-12 lg:pb-40">
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-heading font-bold text-[2.5rem] leading-[1.1] text-forest-green mb-8">
                Product specifications
              </h2>
              <div className="space-y-4">
                {SPECIFICATIONS.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex justify-between items-center py-3 border-b border-gray-50/50 last:border-0"
                  >
                    <span className="text-sm text-gray-500">{spec.label}</span>
                    <span className="text-sm font-medium text-gray-800">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <PolishedImage
                src="/images/products/zone-target.svg"
                alt="Target zone detail"
                width={500}
                height={400}
                className="rounded-[2rem] shadow-lg border border-gray-100"
                placeholderColor="#fce7f3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-32 bg-ivory lg:px-12 lg:pb-40">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-[3rem] leading-[1.1] text-forest-green text-center mb-16">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {FAQS.map((faq) => (
              <Card key={faq.q} padding="md" variant="outline" className="border-gray-100/50">
                <CardTitle className="text-base font-medium text-gray-800">{faq.q}</CardTitle>
                <CardDescription className="mt-2">{faq.a}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-20 lg:px-12 lg:pb-24">
        <div className="max-w-4xl mx-auto">
          <Card
            padding="lg"
            className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-forest-green to-organic-green-dark text-white border-transparent"
          >
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10 space-y-4">
              <h2 className="font-heading font-bold text-[3rem] leading-[1.1]">
                Ready to teach your dog something new?
              </h2>
              <p className="text-lg opacity-90">
                Order the Pawpath Training Mat today and start your first milestone
                this week.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="outline" asChild>
                  <Link href="/product/pawpath">Shop the Mat</Link>
                </Button>
                <Button size="lg" asChild>
                  <Link href="/product/pawpath">Learn More</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
