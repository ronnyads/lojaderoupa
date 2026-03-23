export const categoryColors: Record<string, { hex: string; rgb: string; label: string }> = {
  polos:    { hex: "#00D4AA", rgb: "0 212 170",   label: "POLO" },
  bermudas: { hex: "#7C3AED", rgb: "124 58 237",  label: "BERMUDA" },
  bones:    { hex: "#F97316", rgb: "249 115 22",  label: "BONÉ" },
  oculos:   { hex: "#3B82F6", rgb: "59 130 246",  label: "ÓCULOS" },
};

export function getCategoryColor(category: string) {
  return categoryColors[category] ?? categoryColors["polos"];
}
