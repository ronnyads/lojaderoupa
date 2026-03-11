const TopBar = () => {
  return (
    <div className="bg-teal-900 overflow-hidden py-1.5">
      <div className="animate-ticker flex whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-teal-400 font-body text-xs tracking-wide mx-8">
            🏄 FRETE GRÁTIS ACIMA DE R$ 350 EM MANAUS &nbsp;•&nbsp;
            📦 ENTREGA RÁPIDA EM TODA MANAUS &nbsp;•&nbsp;
            💳 PIX COM 5% OFF &nbsp;•&nbsp;
            🤙 ATENDIMENTO VIA WHATSAPP &nbsp;•&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
};

export default TopBar;
