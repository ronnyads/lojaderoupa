import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, ShoppingBag, Menu, X, MessageCircle, Zap } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import TopBar from "./TopBar";

const navItems = [
  { label: "LOOKS", path: "/looks" },
  { label: "POLOS", path: "/colecao/polos" },
  { label: "BERMUDAS", path: "/colecao/bermudas" },
  { label: "BONÉS", path: "/colecao/bones" },
  { label: "ÓCULOS", path: "/colecao/oculos" },
  { label: "DROP", path: "/drop", isDrop: true },
  { label: "SOBRE", path: "/sobre" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const itemCount = useCartStore((s) => s.itemCount());

  return (
    <>
      <TopBar />
      <header className="sticky top-0 z-50 bg-void-950/80 backdrop-blur-xl border-b border-border-subtle">
        <div className="container flex items-center justify-between py-4">
          {/* Mobile menu */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-text-primary hover:text-neon-teal transition-colors p-2 rounded-lg hover:bg-void-800"
          >
            <Menu size={22} />
          </button>

          {/* Logo - Frost Snow Style */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Zap size={24} className="text-neon-teal group-hover:animate-glow-pulse" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-mono text-xl tracking-tight text-text-primary group-hover:text-gradient-teal transition-all">
                ALOHA
              </span>
              <span className="font-mono text-[0.6rem] tracking-[0.25em] text-neon-teal uppercase">
                Surf Concept
              </span>
            </div>
          </Link>

          {/* Desktop nav - Frost Style */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 font-mono text-xs tracking-wider transition-all rounded-lg
                  ${item.isDrop
                    ? "text-neon-orange hover:bg-neon-orange/10 border border-neon-orange/30 hover:border-neon-orange/60"
                    : "text-text-secondary hover:text-text-primary hover:bg-void-800"
                  }`}
              >
                {item.isDrop && <span className="mr-1">🔥</span>}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions - Frost Style */}
          <div className="flex items-center gap-1">
            <button className="hidden md:flex text-text-secondary hover:text-text-primary hover:bg-void-800 transition-all p-2.5 rounded-lg">
              <Search size={20} />
            </button>

            <Link
              to="/favoritos"
              className="text-text-secondary hover:text-neon-purple hover:bg-void-800 transition-all p-2.5 rounded-lg"
            >
              <Heart size={20} />
            </Link>

            <button
              onClick={toggleCart}
              className="relative text-text-secondary hover:text-neon-teal hover:bg-void-800 transition-all p-2.5 rounded-lg"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-neon-teal text-void-950 font-mono text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-glow-pulse"
                >
                  {itemCount}
                </span>
              )}
            </button>

            <a
              href="https://wa.me/5592934503860"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-neon-green hover:bg-void-800 transition-all px-3 py-2 rounded-lg ml-2"
            >
              <MessageCircle size={18} />
              <span className="font-mono text-xs">Chat</span>
            </a>
          </div>
        </div>

        {/* Mobile drawer - Frost Style */}
        {mobileOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <div
              className="absolute inset-0 bg-void-950/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 w-80 bg-void-900 border-r border-border-subtle flex flex-col animate-fade-in-up">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border-subtle">
                <div className="flex items-center gap-2">
                  <Zap size={20} className="text-neon-teal" />
                  <span className="font-mono text-lg text-text-primary">ALOHA</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-text-secondary hover:text-text-primary p-2 rounded-lg hover:bg-void-800"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Status */}
              <div className="px-6 py-3 bg-void-800/50">
                <div className="flex items-center gap-2 text-neon-teal font-mono text-xs">
                  <span className="w-2 h-2 rounded-full bg-neon-teal animate-pulse" />
                  <span>ONLINE • MANAUS-AM</span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col p-4 gap-1">
                {navItems.map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`py-3 px-4 font-mono text-sm tracking-wider rounded-lg transition-all flex items-center gap-3
                      ${item.isDrop
                        ? "text-neon-orange bg-neon-orange/5 border border-neon-orange/20 hover:bg-neon-orange/10"
                        : "text-text-secondary hover:text-text-primary hover:bg-void-800"
                      }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <span className="text-text-tertiary font-mono text-xs">&gt;</span>
                    {item.label}
                    {item.isDrop && <span className="ml-auto">🔥</span>}
                  </Link>
                ))}
              </nav>

              {/* Footer */}
              <div className="mt-auto p-6 border-t border-border-subtle space-y-3">
                <a
                  href="https://wa.me/5592934503860"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-neon-green/10 border border-neon-green/30 rounded-lg font-mono text-sm text-neon-green hover:bg-neon-green/20 transition-all"
                >
                  <MessageCircle size={18} />
                  FALAR NO WHATSAPP
                </a>

                <div className="text-center">
                  <p className="text-text-tertiary font-mono text-xs">
                    Atendimento: Seg-Sex 9h-18h
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
