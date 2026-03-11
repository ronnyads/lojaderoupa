import { Link } from "react-router-dom";
import { MessageCircle, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-ocean-dark noise-texture relative">
      {/* Wave SVG */}
      <svg className="w-full h-12 -mb-1" viewBox="0 0 1440 48" fill="none" preserveAspectRatio="none">
        <path d="M0 48h1440V20c-240 20-480-10-720 10S240 0 0 20v28z" fill="hsl(var(--ocean-950))" />
      </svg>

      <div className="container py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo */}
        <div className="col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🤙</span>
            <div className="flex flex-col leading-none">
              <span className="font-display text-2xl text-sand">ALOHA</span>
              <span className="font-heading text-[0.5rem] tracking-[0.3em] text-teal-400 font-semibold">SURF CONCEITO</span>
            </div>
          </div>
          <p className="text-sand/60 font-body text-sm mb-4">
            Moda masculina estilo jogador. Salve! 🤙
          </p>
          <a href="https://instagram.com/aloha_surf_conceito" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-teal-400 hover:text-teal text-sm">
            <Instagram size={16} /> @aloha_surf_conceito
          </a>
        </div>

        {/* Collections */}
        <div>
          <h4 className="font-heading text-sand text-sm font-bold mb-4 uppercase">Coleções</h4>
          <div className="flex flex-col gap-2">
            {["Polos", "Bermudas", "Bonés", "Óculos", "Drops"].map(item => (
              <Link key={item} to={`/colecao/${item.toLowerCase()}`} className="text-sand/60 hover:text-sand text-sm font-body transition-colors">{item}</Link>
            ))}
          </div>
        </div>

        {/* About */}
        <div>
          <h4 className="font-heading text-sand text-sm font-bold mb-4 uppercase">Sobre</h4>
          <div className="flex flex-col gap-2">
            {[
              { label: "Quem Somos", path: "/sobre" },
              { label: "Entrega Manaus", path: "/contato" },
              { label: "Política de Troca", path: "/sobre" },
              { label: "FAQ", path: "/sobre" },
            ].map(item => (
              <Link key={item.label} to={item.path} className="text-sand/60 hover:text-sand text-sm font-body transition-colors">{item.label}</Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading text-sand text-sm font-bold mb-4 uppercase">Contato</h4>
          <div className="flex flex-col gap-3">
            <a href="https://wa.me/5592934503860" className="flex items-center gap-2 text-[#25D366] text-sm font-body">
              <MessageCircle size={14} /> (92) 9345-0386
            </a>
            <a href="https://wa.me/5592993429974" className="flex items-center gap-2 text-[#25D366] text-sm font-body">
              <MessageCircle size={14} /> (92) 99342-9974
            </a>
          </div>
          <div className="mt-4 flex gap-2 text-sand/40 text-xs font-body">
            PIX • Cartão • Boleto
          </div>
        </div>
      </div>

      <div className="border-t border-ocean-800 py-4">
        <p className="text-center text-sand/40 text-xs font-body">
          Feito com 🏄 em Manaus, AM — © {new Date().getFullYear()} Aloha Surf Conceito
        </p>
      </div>
    </footer>
  );
};

export default Footer;
