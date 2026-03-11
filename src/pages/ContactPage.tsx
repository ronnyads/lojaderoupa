import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { MessageCircle, MapPin } from "lucide-react";

const zones = [
  { zone: "Centro", prazo: "24h", frete: "R$ 15" },
  { zone: "Zona Norte", prazo: "1-2 dias", frete: "R$ 20" },
  { zone: "Zona Sul", prazo: "1-2 dias", frete: "R$ 20" },
  { zone: "Zona Leste", prazo: "2-3 dias", frete: "R$ 25" },
  { zone: "Zona Oeste", prazo: "1-2 dias", frete: "R$ 20" },
  { zone: "Demais municípios AM", prazo: "3-5 dias", frete: "A consultar" },
];

const ContactPage = () => {
  const [cep, setCep] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleCepCheck = () => {
    if (cep.startsWith("69")) {
      setResult("✅ Entregamos no seu endereço! Prazo: 1-2 dias úteis. Frete: R$ 20,00");
    } else if (cep.length >= 8) {
      setResult("📦 Para entregas fora de Manaus, entre em contato pelo WhatsApp.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Entrega em Manaus & Contato | Aloha Surf Conceito</title>
        <meta name="description" content="Entregamos em toda Manaus. Confira prazos e fretes por zona. Contato via WhatsApp." />
      </Helmet>
      <div className="bg-sand min-h-screen pb-20">
        {/* Hero */}
        <div className="bg-ocean-gradient noise-texture py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <MapPin size={300} className="text-sand" />
          </div>
          <div className="relative z-10">
            <h1 className="font-display text-[clamp(2.5rem,7vw,4rem)] text-sand">ENTREGAMOS EM TODA MANAUS</h1>
            <p className="font-body text-sand/60 mt-2 text-lg">Receba seu look na porta de casa 📦</p>
          </div>
        </div>

        <div className="container py-12">
          {/* CEP checker */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto mb-12">
            <h3 className="font-heading text-lg font-bold text-ocean mb-3 text-center">Consulte sua entrega</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={cep}
                onChange={(e) => setCep(e.target.value.replace(/\D/g, "").slice(0, 8))}
                placeholder="Digite seu CEP"
                className="flex-1 px-4 py-3 bg-card border border-sand-200 rounded-lg font-body text-ocean focus:outline-none focus:ring-2 focus:ring-teal"
              />
              <button
                onClick={handleCepCheck}
                className="px-6 py-3 bg-ocean rounded-lg font-heading text-xs font-bold uppercase text-sand hover:bg-ocean-800 transition-colors"
              >
                CALCULAR
              </button>
            </div>
            {result && <p className="font-body text-sm text-ocean mt-3">{result}</p>}
          </motion.div>

          {/* Zones table */}
          <div className="max-w-2xl mx-auto mb-12">
            <h3 className="font-heading text-lg font-bold text-ocean mb-4 text-center">Prazos por Zona</h3>
            <div className="bg-card rounded-lg overflow-hidden" style={{ boxShadow: "var(--al-shadow-card)" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-ocean text-sand">
                    <th className="text-left py-3 px-4 font-heading text-xs uppercase">Zona</th>
                    <th className="text-left py-3 px-4 font-heading text-xs uppercase">Prazo</th>
                    <th className="text-left py-3 px-4 font-heading text-xs uppercase">Frete</th>
                  </tr>
                </thead>
                <tbody className="font-body text-ocean/80">
                  {zones.map((z, i) => (
                    <tr key={z.zone} className={i % 2 === 0 ? "bg-card" : "bg-sand-100"}>
                      <td className="py-3 px-4 font-semibold">{z.zone}</td>
                      <td className="py-3 px-4">{z.prazo}</td>
                      <td className="py-3 px-4 font-price font-semibold">{z.frete}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center font-body text-sm text-teal font-semibold mt-3">🏄 Frete grátis acima de R$ 350!</p>
          </div>

          {/* Contact */}
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-heading text-lg font-bold text-ocean mb-6">Fale Conosco</h3>
            <div className="space-y-3">
              <a href="https://wa.me/5592934503860" className="flex items-center justify-center gap-3 p-4 bg-card rounded-lg hover:bg-sand-100 transition-colors" style={{ boxShadow: "var(--al-shadow-card)" }}>
                <MessageCircle size={20} className="text-[#25D366]" />
                <span className="font-body text-ocean font-medium">(92) 9345-0386</span>
              </a>
              <a href="https://wa.me/5592993429974" className="flex items-center justify-center gap-3 p-4 bg-card rounded-lg hover:bg-sand-100 transition-colors" style={{ boxShadow: "var(--al-shadow-card)" }}>
                <MessageCircle size={20} className="text-[#25D366]" />
                <span className="font-body text-ocean font-medium">(92) 99342-9974</span>
              </a>
            </div>
            <p className="font-body text-sm text-ocean/50 mt-4">Atendemos Seg–Sáb das 9h às 18h (horário de Manaus)</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
