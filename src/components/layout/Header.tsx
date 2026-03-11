import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, ShoppingBag, Menu, X, MessageCircle } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import TopBar from "./TopBar";

const navItems = [
  { label: "LOOKS", path: "/looks" },
  { label: "POLOS", path: "/colecao/polos" },
  { label: "BERMUDAS", path: "/colecao/bermudas" },
  { label: "BONÉS", path: "/colecao/bones" },
  { label: "ÓCULOS", path: "/colecao/oculos" },
  { label: "DROP 🔥", path: "/drop", isDrop: true },
  { label: "SOBRE", path: "/sobre" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const itemCount = useCartStore((s) => s.itemCount());

  return (
    <>
      <TopBar />
      <header className="sticky top-0 z-50 bg-ocean-dark noise-texture">
        <div className="container flex items-center justify-between py-3">
          {/* Mobile menu */}
          <button onClick={() => setMobileOpen(true)} className="lg:hidden text-sand p-1">
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-teal text-2xl">🤙</span>
            <div className="flex flex-col leading-none">
              <span className="font-display text-[2rem] leading-none text-sand tracking-wide">ALOHA</span>
              <span className="font-heading text-[0.55rem] tracking-[0.3em] text-teal-400 font-semibold">SURF CONCEITO</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-body text-xs font-semibold uppercase tracking-[0.1em] transition-all pb-1 border-b-2 ${
                  item.isDrop
                    ? "text-coral border-coral animate-pulse-coral"
                    : "text-sand/80 border-transparent hover:text-sand hover:border-coral"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="hidden md:flex text-sand/80 hover:text-sand transition-colors p-1">
              <Search size={20} />
            </button>
            <Link to="/favoritos" className="text-sand/80 hover:text-sand transition-colors p-1">
              <Heart size={20} />
            </Link>
            <button onClick={toggleCart} className="relative text-sand/80 hover:text-sand transition-colors p-1">
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal text-ocean font-price text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            <a
              href="https://wa.me/5592934503860"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1 text-[#25D366] hover:brightness-110 transition p-1"
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <div className="absolute inset-0 bg-ocean/40" onClick={() => setMobileOpen(false)} />
            <div className="absolute inset-y-0 left-0 w-72 bg-ocean-900 flex flex-col animate-slide-up">
              <div className="flex items-center justify-between p-4">
                <span className="font-display text-xl text-sand">ALOHA</span>
                <button onClick={() => setMobileOpen(false)} className="text-sand"><X size={24} /></button>
              </div>
              <nav className="flex flex-col p-4 gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`py-3 px-4 font-body text-sm uppercase tracking-wider border-l-2 transition-colors ${
                      item.isDrop
                        ? "text-coral border-coral"
                        : "text-sand/80 border-transparent hover:border-teal hover:text-sand"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto p-4">
                <a
                  href="https://wa.me/5592934503860"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 bg-[#25D366] rounded-lg font-heading text-sm font-bold text-sand"
                >
                  <MessageCircle size={18} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
