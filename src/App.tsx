import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
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

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <Header />
          <CartDrawer />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/produto/:slug" element={<ProductPage />} />
            <Route path="/montar-look" element={<OutfitBuilderPage />} />
            <Route path="/looks" element={<LooksPage />} />
            <Route path="/looks/:slug" element={<LooksPage />} />
            <Route path="/colecao/:slug" element={<CollectionPage />} />
            <Route path="/drop" element={<DropPage />} />
            <Route path="/contato" element={<ContactPage />} />
            <Route path="/sobre" element={<ContactPage />} />
            <Route path="/carrinho" element={<Index />} />
            <Route path="/conta" element={<Index />} />
            <Route path="/favoritos" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <WhatsAppFloat />
          <MobileNav />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
