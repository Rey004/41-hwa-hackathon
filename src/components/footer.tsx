import Link from "next/link";

const YEAR = new Date().getFullYear();

const FOOTER_LINKS = [
  { label: "Shop", href: "/product/pawpath" },
  { label: "How it works", href: "/product/pawpath" },
  { label: "Training guide", href: "/" },
  { label: "FAQ", href: "/" },
  { label: "Contact", href: "/" },
  { label: "Shipping & returns", href: "/" },
];

const LEGAL_LINKS = [
  { label: "Privacy policy", href: "/" },
  { label: "Terms of service", href: "/" },
  { label: "Accessibility", href: "/" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-ivory">
      <div className="px-6 py-12 lg:px-12 lg:py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <svg className="h-6 w-6 text-forest-green fill-forest-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M10 20v-6l4 4 4-4v6" />
                <path d="M10 2H2v16l8-8-8-8z" />
              </svg>
              <span className="font-heading font-bold text-xl tracking-tighter">PAWPATH</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Every pawstep learns something. Premium interactive training for dogs
              of every age.
            </p>
          </div>
          {FOOTER_LINKS.map((link) => (
            <div key={link.label}>
              <h3 className="text-xs font-heading font-semibold uppercase tracking-widest text-gray-400 mb-4">
                {link.label}
              </h3>
              <Link
                href={link.href}
                className="block text-sm text-gray-600 hover:text-forest-green transition-colors mb-2"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto border-t border-gray-200/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400">
              © {YEAR} Pawpath. All rights reserved.
            </p>
            <div className="flex gap-4">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs text-gray-400 hover:text-forest-green transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
