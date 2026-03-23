import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";

// Above-the-fold: carrega imediatamente
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";

// Below-the-fold: lazy loaded
const DropSection = lazy(() => import("@/components/home/DropSection"));
const ProductsSection = lazy(() => import("@/components/home/ProductsSection"));
const SocialProofSection = lazy(() => import("@/components/home/SocialProofSection"));
const LooksSection = lazy(() => import("@/components/home/LooksSection"));
const KitBuilderSection = lazy(() => import("@/components/home/KitBuilderSection"));
const InstagramSection = lazy(() => import("@/components/home/InstagramSection"));
const WhatsAppCTASection = lazy(() => import("@/components/home/WhatsAppCTASection"));

const SectionFallback = () => <div className="h-64 bg-void-950" />;

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

      <Suspense fallback={<SectionFallback />}>
        <DropSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ProductsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <SocialProofSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <LooksSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <KitBuilderSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <InstagramSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <WhatsAppCTASection />
      </Suspense>
    </>
  );
};

export default Index;
