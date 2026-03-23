const TopBar = () => {
  return (
    <div className="bg-void-900 border-b border-border-subtle overflow-hidden py-2">
      <div className="animate-ticker flex whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-neon-teal font-mono text-xs tracking-wider mx-8 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-teal animate-pulse" />
            FRETE GRÁTIS ACIMA DE R$ 350 EM MANAUS
            <span className="text-text-tertiary">•</span>
            <span className="w-1.5 h-1.5 rounded-full bg-neon-purple animate-pulse" />
            ENTREGA RÁPIDA EM TODA MANAUS
            <span className="text-text-tertiary">•</span>
            <span className="w-1.5 h-1.5 rounded-full bg-neon-orange animate-pulse" />
            PIX COM 5% OFF
            <span className="text-text-tertiary">•</span>
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
            ATENDIMENTO VIA WHATSAPP
            <span className="text-text-tertiary">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TopBar;
