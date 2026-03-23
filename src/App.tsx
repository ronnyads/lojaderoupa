import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import PageTransition from "@/components/ui/PageTransition";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import MobileNav from "@/components/layout/MobileNav";
import CartDrawer from "@/components/layout/CartDrawer";
import Index from "./pages/Index";
import ProductPage from "./pages/ProductPage";
import OutfitBuilderPage from "./pages/OutfitBuilderPage";
import LooksPage from "./pages/LooksPage";
import CollectionPage from "./pages/CollectionPage";
import DropPage from "./pages/DropPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/produto/:slug" element={<PageTransition><ProductPage /></PageTransition>} />
        <Route path="/montar-look" element={<PageTransition><OutfitBuilderPage /></PageTransition>} />
        <Route path="/looks" element={<PageTransition><LooksPage /></PageTransition>} />
        <Route path="/looks/:slug" element={<PageTransition><LooksPage /></PageTransition>} />
        <Route path="/colecao/:slug" element={<PageTransition><CollectionPage /></PageTransition>} />
        <Route path="/drop" element={<PageTransition><DropPage /></PageTransition>} />
        <Route path="/contato" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/sobre" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/carrinho" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/conta" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/favoritos" element={<PageTransition><Index /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <CustomCursor />
          <ScrollProgress />
          <Header />
          <CartDrawer />
          <AppRoutes />
          <div className="pb-16 lg:pb-0" />
          <Footer />
          <WhatsAppFloat />
          <MobileNav />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
