import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { products, formatPrice, type Product } from "@/data/products";
import { getProductImage } from "@/data/productImages";

const categories: Record<string, { label: string; filter: (p: Product) => boolean }> = {
  polos: { label: "Polos", filter: (p) => p.category === "polos" },
  bermudas: { label: "Bermudas", filter: (p) => p.category === "bermudas" },
  bones: { label: "Bonés", filter: (p) => p.category === "bones" },
  oculos: { label: "Óculos", filter: (p) => p.category === "oculos" },
};

const CollectionPage = () => {
  const { slug } = useParams();
  const cat = slug ? categories[slug] : null;
  const filtered = cat ? products.filter(cat.filter) : products;

  return (
    <>
      <Helmet>
        <title>{cat?.label || "Coleção"} | Aloha Surf Conceito — Manaus</title>
      </Helmet>
      <div className="bg-sand min-h-screen pb-20">
        <div className="bg-ocean-dark noise-texture py-16 text-center">
          <h1 className="font-display text-[clamp(2.5rem,7vw,4rem)] text-sand">{cat?.label?.toUpperCase() || "COLEÇÃO"}</h1>
        </div>

        {/* Filter chips */}
        <div className="container py-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {Object.entries(categories).map(([key, val]) => (
              <Link
                key={key}
                to={`/colecao/${key}`}
                className={`px-5 py-2 rounded-pill font-heading text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                  slug === key ? "bg-ocean text-sand" : "bg-sand-100 text-ocean/60 hover:text-ocean"
                }`}
              >
                {val.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((p, i) => (
              <motion.div
                key={p.sku}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/produto/${p.slug}`} className="block bg-card rounded-lg overflow-hidden card-hover" style={{ boxShadow: "var(--al-shadow-card)" }}>
                  <div className="aspect-[3/4] bg-sand-100" />
                  <div className="p-3">
                    <p className="font-heading text-sm font-semibold text-ocean mb-1">{p.name}</p>
                    <p className="font-price text-coral font-semibold">{formatPrice(p.promotionalPrice || p.price)}</p>
                    <p className="font-body text-[10px] text-muted-foreground">3x de {formatPrice((p.promotionalPrice || p.price) / 3)} s/ juros</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionPage;
