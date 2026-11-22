export const SITE_NAME = "Pawpath";
export const TAGLINE = "Every pawstep learns something.";
export const CURRENCY = "USD";

export const PRODUCT = {
  id: "pawpath-mat",
  slug: "pawpath",
  name: "Pawpath Training Mat",
  tagline: "One mat. Many milestones.",
  description:
    "The all-in-one interactive dog training mat with five permanently built-in learning zones. Designed for puppies and adult dogs, Pawpath turns every play session into purposeful progress.",
  price: 14900, // $149.00 in cents
  compareAtPrice: 19900,
  dimensions: "90 × 60 cm (35.4 × 23.6 in)",
  weight: "2.1 kg",
  materials:
    "Premium non-toxic TPE surface with natural rubber backing. Water-resistant, chew-resistant, and machine-washable.",
  care: "Wipe clean with a damp cloth or hand wash with mild soap. Air dry flat.",
  sku: "PAWPATH-MAT-001",
  inStock: true,
  images: [
    {
      id: "hero",
      url: "/images/products/hero.svg",
      alt: "Pawpath training mat full view",
      primary: true,
    },
    {
      id: "zone-target",
      url: "/images/products/zone-target.svg",
      alt: "Target zone for touch and paw commands",
    },
    {
      id: "zone-place",
      url: "/images/products/zone-place.svg",
      alt: "Place zone for sit and down",
    },
    {
      id: "zone-wot",
      url: "/images/products/zone-wot.svg",
      alt: "Wot zone for patience and stay",
    },
    {
      id: "zone-pathway",
      url: "/images/products/zone-pathway.svg",
      alt: "Pathway zone for follow and return",
    },
    {
      id: "zone-reward",
      url: "/images/products/zone-reward.svg",
      alt: "Reward zone for positive reinforcement",
    },
    {
      id: "lifestyle",
      url: "/images/products/lifestyle.svg",
      alt: "Golden retriever on Pawpath mat",
    },
  ],
};

export const TRAINING_ZONES = [
  {
    id: "target",
    name: "Target",
    title: "Touch & Paw Commands",
    color: "bg-organic-green",
    description:
      "A dedicated contact point that teaches your dog to touch with nose or paw on cue — the foundation of precision targeting.",
    icon: "Target",
  },
  {
    id: "place",
    name: "Place",
    title: "Sit & Down",
    color: "bg-pale-mint",
    description:
      "A clearly bounded zone that reinforces sit and down stays, building impulse control and calm behavior.",
    icon: "LayoutGrid",
  },
  {
    id: "wot",
    name: "Wot",
    title: "Patience & Stay",
    color: "bg-forest-green",
    description:
      "The waiting zone. Teaches patience, duration, and reliable stay commands even with distractions nearby.",
    icon: "Clock",
  },
  {
    id: "pathway",
    name: "Pathway",
    title: "Follow & Return",
    color: "bg-coral",
    description:
      "A guided corridor that shapes follow, heel, and return-to-hand behaviors through directional movement.",
    icon: "ArrowRight",
  },
  {
    id: "reward",
    name: "Reward",
    title: "Positive Reinforcement",
    color: "bg-organic-green",
    description:
      "The celebration zone where every success is marked and rewarded, keeping motivation high.",
    icon: "Heart",
  },
];

export const TRAINING_STEPS = [
  {
    step: 1,
    title: "Unroll & Introduce",
    body: "Lay the mat flat in a quiet area. Let your dog sniff and explore at their own pace.",
  },
  {
    step: 2,
    title: "Mark the Zone",
    body: "Use a treat to guide your dog onto each zone, pairing the action with a clear cue word.",
  },
  {
    step: 3,
    title: "Reward & Repeat",
    body: "Mark success immediately with praise and a treat from the reward zone. Short, daily sessions work best.",
  },
  {
    step: 4,
    title: "Build Milestones",
    body: "Combine zones into sequences. Watch confidence grow as your dog masters each new skill.",
  },
];

export const LEARNING_STAGES = [
  {
    stage: "Puppy (8–16 weeks)",
    focus: "Socialization & basics",
    zones: ["target", "reward"],
    goal: "Confidence and name recognition",
  },
  {
    stage: "Junior (4–8 months)",
    focus: "Obedience foundations",
    zones: ["place", "wot", "pathway"],
    goal: "Sit, down, stay, and recall",
  },
  {
    stage: "Adult (8+ months)",
    focus: "Advanced skills",
    zones: ["all"],
    goal: "Multi-step sequences and reliability",
  },
];

export const SPECIFICATIONS = [
  { label: "Dimensions", value: "90 × 60 cm (35.4 × 23.6 in)" },
  { label: "Thickness", value: "6 mm" },
  { label: "Weight", value: "2.1 kg" },
  { label: "Surface", value: "Non-toxic TPE" },
  { label: "Backing", value: "Natural rubber" },
  { label: "Zones", value: "5 permanently built-in" },
  { label: "Care", value: "Wipe clean / hand wash" },
  { label: "Origin", value: "Designed for all breeds" },
];

export const FAQS = [
  {
    q: "What age can my dog start using Pawpath?",
    a: "Puppies as young as 8 weeks can begin with gentle, reward-based introduction. The mat grows with your dog through every life stage.",
  },
  {
    q: "Is the mat safe for chewers?",
    a: "Yes. The TPE surface is tough, non-toxic, and designed to withstand regular use. Always supervise play and replace if heavily damaged.",
  },
  {
    q: "How do I clean the mat?",
    a: "Wipe with a damp cloth and mild soap, or hand wash and air dry flat. Avoid harsh chemicals and machine drying.",
  },
  {
    q: "Does it work for all breeds?",
    a: "Absolutely. The 90 × 60 cm size suits small to large breeds, and the zone-based approach adapts to any dog's learning style.",
  },
  {
    q: "Is this a replacement for professional training?",
    a: "Pawpath complements professional training by giving you a structured, consistent tool for daily practice at home.",
  },
];

export type Product = typeof PRODUCT;
export type TrainingZone = (typeof TRAINING_ZONES)[number];
