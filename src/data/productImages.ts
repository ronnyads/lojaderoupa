// Product image mapping
import poloNavy from "@/assets/products/polo-navy.jpg";
import poloBranca from "@/assets/products/polo-branca.jpg";
import poloListrada from "@/assets/products/polo-listrada.jpg";
import poloDryfit from "@/assets/products/polo-dryfit.jpg";
import poloVerde from "@/assets/products/polo-verde.jpg";
import bermudaSarja from "@/assets/products/bermuda-sarja.jpg";
import bermudaNavy from "@/assets/products/bermuda-navy.jpg";
import bermudaMoletom from "@/assets/products/bermuda-moletom.jpg";
import bermudaSurf from "@/assets/products/bermuda-surf.jpg";
import bermudaCargo from "@/assets/products/bermuda-cargo.jpg";
import boneNavy from "@/assets/products/bone-navy.jpg";
import boneTrucker from "@/assets/products/bone-trucker.jpg";
import boneBordado from "@/assets/products/bone-bordado.jpg";
import oculosSport from "@/assets/products/oculos-sport.jpg";
import oculosWayfarer from "@/assets/products/oculos-wayfarer.jpg";
import oculosAviador from "@/assets/products/oculos-aviador.jpg";

export const productImages: Record<string, string> = {
  "PL-NAV-001": poloNavy,
  "PL-BCO-002": poloBranca,
  "PL-LIS-003": poloListrada,
  "PL-PMD-004": poloDryfit,
  "PL-VER-005": poloVerde,
  "BM-SAR-001": bermudaSarja,
  "BM-MOL-002": bermudaMoletom,
  "BM-SRF-003": bermudaSurf,
  "BM-CAR-004": bermudaCargo,
  "BN-STR-001": boneNavy,
  "BN-TRK-002": boneTrucker,
  "BN-EMB-003": boneBordado,
  "OC-SPT-001": oculosSport,
  "OC-WAY-002": oculosWayfarer,
  "OC-PIL-003": oculosAviador,
};

// For bermuda-navy (used as default bermuda image in hero)
export { bermudaNavy };

export const getProductImage = (sku: string): string | undefined => productImages[sku];
