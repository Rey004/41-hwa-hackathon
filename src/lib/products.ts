export const SITE_URL = "https://41-hwa-hackathon.vercel.app";

export interface TrainingZone {
  id: string;
  name: string;
  eyebrow: string;
  tagline: string;
  description: string;
  dogSkill: string;
  ownerCue: string;
  icon: string;
  position: { x: number; y: number };
  badgeText: string;
  image: string;
}

export interface ProductConfig {
  name: string;
  eyebrow: string;
  headline: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice: number;
  savings: number;
  freeShippingThreshold: number;
  highlights: string[];
  dimensions: string;
  construction: string;
  material: string;
  surface: string;
  base: string;
  cleaning: string;
  power: string;
}

export const PRODUCT: ProductConfig = {
  name: "The PAWPATH Interactive Training Mat",
  eyebrow: "INTRODUCING PAWPATH",
  headline: "One mat. A whole lot to learn.",
  tagline: "Every pawstep learns something.",
  description:
    "Meet the all-in-one training mat designed to make practising everyday commands and good habits more engaging. Five integrated zones bring different training activities together in one thoughtfully designed product.",
  price: 3499,
  originalPrice: 4299,
  savings: 800,
  freeShippingThreshold: 1999,
  highlights: [
    "Five integrated training zones.",
    "Single-piece construction.",
    "Tactile training surfaces.",
    "No electricity required.",
  ],
  dimensions: "Approximately 90 × 60 cm (35.4″ × 23.6″)",
  construction: "Single integrated component with beveled anti-curl perimeter",
  material: "Premium Non-Toxic Food-Grade Silicone & Natural Vulcanized Rubber",
  surface: "Multi-textured concentric ribs, grip nubs and directional corridors",
  base: "High-traction anti-slip anchor base (safe on hardwood, tile & carpets)",
  cleaning:
    "Wipe clean with a damp cloth or rinse with mild soapy water. Fast air-drying in 15 minutes.",
  power: "No electricity or batteries required. Physical, owner-guided learning.",
};

export const ZONES: TrainingZone[] = [
  {
    id: "target",
    name: "TARGET ZONE",
    eyebrow: "01 / PRECISION",
    tagline: "Make the first move.",
    description:
      "A tactile target for practising nose touches, paw interactions and following cues.",
    dogSkill: "Nose targeting, paw touch, directional focus",
    ownerCue: '"Touch!" / "Paw!"',
    icon: "Target",
    position: { x: 22, y: 30 },
    badgeText: "Tactile Target",
    image: "/images/products/zone-target.webp",
  },
  {
    id: "place",
    name: "PLACE ZONE",
    eyebrow: "02 / BOUNDARY",
    tagline: "Find your spot.",
    description:
      "A dedicated space to practise sitting, lying down and settling in one place.",
    dogSkill: "Boundary settle, door calm, impulse rest",
    ownerCue: '"Place!" / "Settle!"',
    icon: "Home",
    position: { x: 74, y: 38 },
    badgeText: "Cushioned Sanctuary",
    image: "/images/products/zone-place.webp",
  },
  {
    id: "wait",
    name: "WAIT ZONE",
    eyebrow: "03 / PATIENCE",
    tagline: "Good things take patience.",
    description:
      "A defined training area for building patience, practising stays and learning release cues.",
    dogSkill: "Duration hold, threshold pause, release command",
    ownerCue: '"Wait..." -> "Free!"',
    icon: "Clock",
    position: { x: 48, y: 65 },
    badgeText: "Calibrated Markers",
    image: "/images/products/zone-wait.webp",
  },
  {
    id: "pathway",
    name: "PATHWAY ZONE",
    eyebrow: "04 / GUIDANCE",
    tagline: "Follow the pawsteps.",
    description:
      "Integrated paw patterns that encourage dogs to follow directions and move between activities.",
    dogSkill: "Heel alignment, focused recall, direction changes",
    ownerCue: '"Here!" / "Heel!"',
    icon: "Compass",
    position: { x: 48, y: 22 },
    badgeText: "Directional Corridor",
    image: "/images/products/zone-pathway.webp",
  },
  {
    id: "reward",
    name: "REWARD ZONE",
    eyebrow: "05 / REINFORCEMENT",
    tagline: "Every good move deserves a little praise.",
    description:
      "A designated area for positive reinforcement after successful interactions.",
    dogSkill: "Gentle food taking, dopamine pairing, calm completion",
    ownerCue: '"Yes!" / *Marker*',
    icon: "Sparkles",
    position: { x: 20, y: 76 },
    badgeText: "Reinforcement Dock",
    image: "/images/products/zone-reward.webp",
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "CHOOSE A LESSON",
    description: "Pick a behaviour you'd like to practise.",
  },
  {
    step: "02",
    title: "GIVE THE CUE",
    description: "Use a familiar verbal command or hand signal.",
  },
  {
    step: "03",
    title: "MAKE IT REWARDING",
    description: "Guide your dog and reward the behaviour you want to reinforce.",
  },
  {
    step: "04",
    title: "REPEAT & PROGRESS",
    description: "Practise regularly and gradually build consistency.",
  },
];

export const TRAINING_STAGES = [
  {
    id: "puppy",
    title: "PUPPY — THE FIRST PAWSTEPS",
    badge: "8-16 WEEKS",
    description:
      "Start with simple commands, touch interactions and getting comfortable with training.",
    skills: ["Target touches", "Voluntary sit", "Short boundary rest"],
    image: "/images/products/stage-puppy.webp",
  },
  {
    id: "learner",
    title: "LEARNER — GETTING THE HANG OF IT",
    badge: "4-12 MONTHS",
    description:
      "Practise waiting, staying, following directions and responding to familiar cues.",
    skills: ["Doorbell settle", "Step-back stays", "Pathway recall runway"],
    image: "/images/products/stage-learner.webp",
  },
  {
    id: "well-mannered",
    title: "WELL-MANNERED — MAKING IT A HABIT",
    badge: "1+ YEARS",
    description:
      "Reinforce familiar commands, settling behaviours and everyday routines.",
    skills: ["Dinner table boundary", "Compound drills", "Mental enrichment"],
    image: "/images/products/stage-adult.webp",
  },
];

export const HOMEPAGE_FAQS = [
  {
    question: "What is PAWPATH?",
    answer:
      "PAWPATH is an interactive dog-training mat with five integrated zones designed to support owner-guided obedience and everyday manners training.",
  },
  {
    question: "What can my dog learn?",
    answer:
      "You can practise foundational commands such as sit, down, stay, come, touch and paw, alongside behaviours such as waiting, settling and following directions.",
  },
  {
    question: "Is it suitable for puppies?",
    answer:
      "It can be introduced to puppies using short, age-appropriate and positive training sessions.",
  },
  {
    question: "Does it require electricity?",
    answer:
      "No. PAWPATH is designed as a physical, non-electronic training mat.",
  },
  {
    question: "Does it replace a professional dog trainer?",
    answer:
      "No. PAWPATH is a training aid. Professional guidance may still be useful for complex behavioural challenges.",
  },
];

export const PRODUCT_PAGE_FAQS = [
  {
    question: "What comes in the package?",
    answer:
      "Each package includes 1x PAWPATH All-in-One Interactive Dog-Training Mat, 1x Quick-Start Visual Training Guide, and 1x Roll-up Storage Strap.",
  },
  {
    question: "Can puppies use it?",
    answer:
      "Yes, with age-appropriate activities and supervised training. Puppies learn boundaries faster through tactile surfaces.",
  },
  {
    question: "Does it need batteries or electricity?",
    answer:
      "No, it is a non-electronic physical training product powered completely by owner-dog interaction and positive reinforcement.",
  },
  {
    question: "Can multiple dogs use it?",
    answer:
      "It may be used for multiple dogs, but individual training sessions are recommended to avoid distractions and competition.",
  },
  {
    question: "How do I clean it?",
    answer:
      "Simply wipe it with warm soapy water and a cloth, or rinse it with a hose outdoors. The waterproof silicone dries within 15 minutes.",
  },
  {
    question: "Can it replace professional training?",
    answer:
      "No. It supports everyday training but is not a substitute for professional behavioural guidance.",
  },
];
