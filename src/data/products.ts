export interface Product {
  sku: string;
  name: string;
  slug: string;
  category: "polos" | "bermudas" | "bones" | "oculos";
  price: number;
  promotionalPrice?: number;
  colors: string[];
  sizes?: string[];
  stock?: number | Record<string, number>;
  badge?: "MAIS PEDIDO" | "NOVO DROP" | "PROMOÇÃO" | "DROP EXCLUSIVO" | "NOVO";
  shortDescription?: string;
  material?: string;
  featured?: boolean;
  lensColor?: string[];
}

export const products: Product[] = [
  // POLOS
  {
    sku: "PL-NAV-001", name: "Polo Piquet Navy Premium", slug: "polo-piquet-navy-premium",
    category: "polos", price: 189.90, colors: ["navy", "branco", "cinza"],
    sizes: ["P", "M", "G", "GG"], stock: { navy: 8, branco: 15, cinza: 3 },
    badge: "MAIS PEDIDO", shortDescription: "Polo piquet de alta qualidade, corte premium, acabamento sofisticado.",
    material: "100% Algodão Piquet", featured: true,
  },
  {
    sku: "PL-BCO-002", name: "Polo Lisa Básica Branca", slug: "polo-lisa-basica-branca",
    category: "polos", price: 159.90, colors: ["branco", "preto", "bordô"],
    sizes: ["P", "M", "G", "GG"], badge: "NOVO DROP",
  },
  {
    sku: "PL-LIS-003", name: "Polo Listrada Clássica", slug: "polo-listrada-classica",
    category: "polos", price: 179.90, promotionalPrice: 149.90,
    colors: ["navy/branco", "cinza/branco"], sizes: ["P", "M", "G", "GG"], badge: "PROMOÇÃO",
  },
  {
    sku: "PL-PMD-004", name: "Polo Performance Dry-Fit", slug: "polo-performance-dry-fit",
    category: "polos", price: 199.90, badge: "DROP EXCLUSIVO", stock: 5,
    colors: ["verde-escuro", "preto", "azul-royal"], sizes: ["P", "M", "G", "GG"],
  },
  {
    sku: "PL-VER-005", name: "Polo Verde Militar", slug: "polo-verde-militar",
    category: "polos", price: 174.90, colors: ["verde-militar", "caqui"],
    sizes: ["P", "M", "G", "GG"], badge: "NOVO",
  },
  // BERMUDAS
  {
    sku: "BM-SAR-001", name: "Bermuda Sarja Premium Navy", slug: "bermuda-sarja-premium-navy",
    category: "bermudas", price: 149.90, colors: ["navy", "caqui", "preto"],
    sizes: ["38", "40", "42", "44", "46"], badge: "MAIS PEDIDO", featured: true,
  },
  {
    sku: "BM-MOL-002", name: "Bermuda Moletom Streetwear", slug: "bermuda-moletom-streetwear",
    category: "bermudas", price: 139.90, colors: ["cinza-mescla", "preto", "verde"],
    sizes: ["38", "40", "42", "44", "46"], badge: "NOVO",
  },
  {
    sku: "BM-SRF-003", name: "Bermuda Surf Board Short", slug: "bermuda-surf-board-short",
    category: "bermudas", price: 169.90, colors: ["azul-petróleo", "navy-estampa", "branco"],
    sizes: ["38", "40", "42", "44", "46"], badge: "DROP EXCLUSIVO", stock: 7,
  },
  {
    sku: "BM-CAR-004", name: "Bermuda Casual Cargo", slug: "bermuda-casual-cargo",
    category: "bermudas", price: 159.90, promotionalPrice: 129.90,
    colors: ["verde-militar", "caqui"], sizes: ["38", "40", "42", "44", "46"], badge: "PROMOÇÃO",
  },
  // BONÉS
  {
    sku: "BN-STR-001", name: "Boné Strapback Aloha Logo", slug: "bone-strapback-aloha-logo",
    category: "bones", price: 79.90, colors: ["navy", "preto", "branco"], badge: "MAIS PEDIDO",
  },
  {
    sku: "BN-TRK-002", name: "Boné Trucker Surf Co.", slug: "bone-trucker-surf-co",
    category: "bones", price: 89.90, colors: ["bege", "navy", "verde"], badge: "NOVO",
  },
  {
    sku: "BN-EMB-003", name: "Boné Bordado Premium", slug: "bone-bordado-premium",
    category: "bones", price: 99.90, colors: ["preto", "navy"], badge: "DROP EXCLUSIVO", stock: 4,
  },
  // ÓCULOS
  {
    sku: "OC-SPT-001", name: "Óculos Esportivo Square", slug: "oculos-esportivo-square",
    category: "oculos", price: 129.90, badge: "MAIS PEDIDO",
    colors: ["fumê", "espelhado azul", "espelhado prata"], lensColor: ["fumê", "espelhado azul", "espelhado prata"],
  },
  {
    sku: "OC-WAY-002", name: "Óculos Wayfarer Surf", slug: "oculos-wayfarer-surf",
    category: "oculos", price: 119.90, badge: "NOVO",
    colors: ["preto", "tartaruga"], lensColor: ["preto", "tartaruga"],
  },
  {
    sku: "OC-PIL-003", name: "Óculos Piloto Aviador", slug: "oculos-piloto-aviador",
    category: "oculos", price: 149.90, badge: "DROP EXCLUSIVO", stock: 6,
    colors: ["dourado/fumê", "prateado/verde"], lensColor: ["dourado/fumê", "prateado/verde"],
  },
];

export const getProductsByCategory = (cat: Product["category"]) => products.filter(p => p.category === cat);
export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
export const getFeaturedProducts = () => products.filter(p => p.featured);
export const getLowStockProducts = () => products.filter(p => {
  if (typeof p.stock === 'number') return p.stock <= 5;
  return false;
});

export interface Look {
  id: string;
  name: string;
  slug: string;
  description: string;
  products: string[];
  style: string;
  image: string;
  totalPrice: number;
  installment?: string;
  badge?: string;
}

export const looks: Look[] = [
  {
    id: "look-1", name: "Navy Total", slug: "look-navy-total",
    description: "O conjunto perfeito para quem sabe chegar.",
    products: ["PL-NAV-001", "BM-SAR-001", "BN-STR-001", "OC-SPT-001"],
    style: "casual",
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&q=80",
    totalPrice: 549.70,
    installment: "ou 3x de R$ 183,23",
  },
  {
    id: "look-2", name: "Caqui + Navy", slug: "look-caqui-navy",
    description: "Estilo casual sofisticado com tons terrosos.",
    products: ["PL-NAV-001", "BM-CAR-004", "BN-TRK-002"],
    style: "casual",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80",
    totalPrice: 429.70,
  },
  {
    id: "look-3", name: "Branco e Preto", slug: "look-branco-preto",
    description: "Clássico atemporal em preto e branco.",
    products: ["PL-BCO-002", "BM-MOL-002", "BN-EMB-003"],
    style: "casual",
    image: "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?w=600&q=80",
    totalPrice: 399.70,
  },
  {
    id: "look-4", name: "Verde Militar", slug: "look-verde-militar",
    description: "Pegada military com atitude jogador.",
    products: ["PL-VER-005", "BM-CAR-004", "BN-TRK-002"],
    style: "casual",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    totalPrice: 464.70,
  },
  {
    id: "look-5", name: "Bordô + Cinza", slug: "look-bordo-cinza",
    description: "Combinação ousada para se destacar.",
    products: ["PL-BCO-002", "BM-MOL-002", "OC-PIL-003"],
    style: "casual",
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80",
    totalPrice: 488.80,
  },
  {
    id: "look-6", name: "Drop Exclusivo", slug: "look-drop-exclusivo",
    description: "Peças limitadas para quem não espera.",
    products: ["PL-PMD-004", "BM-SRF-003", "BN-EMB-003"],
    style: "praia",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80",
    totalPrice: 469.70,
    badge: "DROP EXCLUSIVO",
  },
];

export const dropProduct = {
  sku: "PL-NAV-001-DROP",
  name: "POLO NAVY DROP #07",
  slug: "polo-navy-drop-07",
  price: 189.90,
  originalPrice: 229.90,
  totalUnits: 15,
  remainingUnits: 8,
  dropDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  active: true,
};

export const colorMap: Record<string, string> = {
  navy: "#1B3A5C",
  branco: "#FFFFFF",
  cinza: "#9CA3AF",
  preto: "#1A1A1A",
  bordô: "#722F37",
  "navy/branco": "#1B3A5C",
  "cinza/branco": "#9CA3AF",
  "verde-escuro": "#1B4332",
  "azul-royal": "#1E40AF",
  "verde-militar": "#4B5320",
  caqui: "#C3B091",
  "cinza-mescla": "#B0B0B0",
  verde: "#2D6A4F",
  "azul-petróleo": "#005F73",
  "navy-estampa": "#1B3A5C",
  bege: "#D4A5A9",
  fumê: "#4A4A4A",
  "espelhado azul": "#3B82F6",
  "espelhado prata": "#C0C0C0",
  tartaruga: "#8B6914",
  "dourado/fumê": "#D4A017",
  "prateado/verde": "#C0C0C0",
};

export const formatPrice = (price: number) =>
  price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const getStockNumber = (product: Product, color?: string): number => {
  if (!product.stock) return 99;
  if (typeof product.stock === "number") return product.stock;
  if (color && product.stock[color] !== undefined) return product.stock[color];
  return Object.values(product.stock).reduce((a, b) => a + b, 0);
};
