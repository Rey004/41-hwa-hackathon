import Link from "next/link";
import { PawPrint } from "lucide-react";

const YEAR = new Date().getFullYear();

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "The Pawpath Mat", href: "/product/pawpath" },
      { label: "Gift a mat", href: "/product/pawpath" },
      { label: "Shipping & returns", href: "/product/pawpath" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "How it works", href: "/#zones" },
      { label: "Training guide", href: "/#zones" },
      { label: "FAQ", href: "/#zones" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our story", href: "/#zones" },
      { label: "Sustainability", href: "/#zones" },
      { label: "Contact", href: "/#zones" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-forest-green text-white">
      <div className="px-6 py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Link href="/" className="inline-flex items-center gap-2.5">
                <PawPrint className="h-8 w-8 fill-organic-green text-organic-green" />
                <span className="font-heading font-extrabold text-2xl tracking-tighter">
                  PAWPATH
                </span>
              </Link>
              <p className="mt-6 max-w-sm text-lg leading-relaxed text-white/70">
                Every pawstep learns something. Premium interactive training for
                dogs of every age, in every home.
              </p>
              <p className="mt-8 text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-organic-green">
                Playtime with a little more purpose
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
              {COLUMNS.map((column) => (
                <div key={column.title}>
                  <h3 className="mb-5 text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-white/40">
                    {column.title}
                  </h3>
                  <ul className="space-y-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-white/70 transition-colors hover:text-organic-green"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-white/40">
              © {YEAR} Pawpath. Every pawstep counts.
            </p>
            <div className="flex flex-wrap gap-6">
              {["Privacy policy", "Terms of service", "Accessibility"].map(
                (label) => (
                  <Link
                    key={label}
                    href="/"
                    className="text-xs text-white/40 transition-colors hover:text-organic-green"
                  >
                    {label}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
