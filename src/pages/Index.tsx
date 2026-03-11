import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import DropSection from "@/components/home/DropSection";
import LooksSection from "@/components/home/LooksSection";
import ProductsSection from "@/components/home/ProductsSection";
import KitBuilderSection from "@/components/home/KitBuilderSection";
import SocialProofSection from "@/components/home/SocialProofSection";
import WhatsAppCTASection from "@/components/home/WhatsAppCTASection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Aloha Surf Conceito | Moda Masculina Estilo Jogador — Manaus, AM</title>
        <meta name="description" content="Moda masculina estilo jogador em Manaus. Polos, bermudas, bonés e óculos premium. Monte seu look completo e receba em casa. +35 mil seguidores no Instagram." />
        <meta property="og:title" content="Aloha Surf Conceito | Moda Masculina Estilo Jogador" />
        <meta property="og:description" content="Polos, bermudas, bonés e óculos premium. Monte seu look e receba em Manaus." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ClothingStore",
          name: "Aloha Surf Conceito",
          description: "Moda masculina estilo jogador em Manaus, AM",
          addressLocality: "Manaus",
          addressRegion: "AM",
          telephone: "(92) 9345-0386",
          url: "https://alohasurfconceito.com.br",
          sameAs: ["https://instagram.com/aloha_surf_conceito"],
        })}</script>
      </Helmet>
      <HeroSection />
      <TrustBar />
      <DropSection />
      <ProductsSection />
      <LooksSection />
      <KitBuilderSection />
      <SocialProofSection />
      <WhatsAppCTASection />
    </>
  );
};

export default Index;
