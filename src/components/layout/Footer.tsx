import { Link } from "react-router-dom";
import { MessageCircle, Instagram, Zap, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-void-950 border-t border-border-subtle relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-neon-teal/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container py-16 grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {/* Logo */}
        <div className="col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <Zap size={24} className="text-neon-teal" />
            <div className="flex flex-col leading-none">
              <span className="font-mono text-2xl text-text-primary">ALOHA</span>
              <span className="font-mono text-[0.55rem] tracking-[0.25em] text-neon-teal">SURF CONCEPT</span>
            </div>
          </div>

          <p className="text-text-secondary font-sans text-sm mb-6 leading-relaxed">
            Moda masculina estilo jogador. Peças selecionadas para quem sabe chegar com estilo.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/aloha_surf_conceito"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-void-800 border border-border-subtle flex items-center justify-center text-text-tertiary hover:text-neon-purple hover:border-neon-purple/50 transition-all"
            >
              <Instagram size={18} />
            </a>
            <a
              href="mailto:contato@alohasurf.com"
              className="w-10 h-10 rounded-lg bg-void-800 border border-border-subtle flex items-center justify-center text-text-tertiary hover:text-neon-teal hover:border-neon-teal/50 transition-all"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Collections */}
        <div>
          <h4 className="font-mono text-text-primary text-xs font-bold mb-4 uppercase tracking-wider">
            Coleções
          </h4>
          <div className="flex flex-col gap-3">
            {["Polos", "Bermudas", "Bonés", "Óculos", "Drops"].map((item) => (
              <Link
                key={item}
                to={`/colecao/${item.toLowerCase()}`}
                className="text-text-secondary hover:text-neon-teal text-sm font-sans transition-colors flex items-center gap-2 group"
              >
                <span className="text-text-tertiary group-hover:text-neon-teal transition-colors">&gt;</span>
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* About */}
        <div>
          <h4 className="font-mono text-text-primary text-xs font-bold mb-4 uppercase tracking-wider">
            Sobre
          </h4>
          <div className="flex flex-col gap-3">
            {[
              { label: "Quem Somos", path: "/sobre" },
              { label: "Entrega Manaus", path: "/contato" },
              { label: "Política de Troca", path: "/sobre" },
              { label: "FAQ", path: "/sobre" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-text-secondary hover:text-neon-teal text-sm font-sans transition-colors flex items-center gap-2 group"
              >
                <span className="text-text-tertiary group-hover:text-neon-teal transition-colors">&gt;</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-mono text-text-primary text-xs font-bold mb-4 uppercase tracking-wider">
            Contato
          </h4>

          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-neon-teal mt-0.5 shrink-0" />
              <div>
                <p className="text-text-secondary text-sm font-sans">Manaus, AM</p>
                <p className="text-text-tertiary text-xs font-mono mt-0.5">Entrega em toda cidade</p>
              </div>
            </div>

            <a
              href="https://wa.me/5592934503860"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-neon-green/5 border border-neon-green/20 hover:border-neon-green/40 transition-all group"
            >
              <MessageCircle size={16} className="text-neon-green group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-neon-green text-sm font-mono">(92) 9345-0386</p>
                <p className="text-text-tertiary text-xs">WhatsApp Business</p>
              </div>
            </a>
          </div>

          <div className="mt-6 flex gap-2">
            {["PIX", "Cartão", "Boleto"].map((method) => (
              <span
                key={method}
                className="px-2 py-1 rounded bg-void-800 border border-border-subtle text-text-tertiary text-xs font-mono"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border-subtle py-6 relative z-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-tertiary text-xs font-mono">
            <span className="text-neon-teal">&gt;</span> Feito em Manaus, AM — © {new Date().getFullYear()} Aloha Surf Concept
          </p>

          <div className="flex items-center gap-2 text-text-tertiary text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            Todos os sistemas operacionais
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
