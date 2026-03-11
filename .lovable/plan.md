

## Plano de Elevação v2.0 — ALOHA SURF CONCEITO

Este plano implementa as 8 melhorias solicitadas, priorizadas por impacto.

---

### TAREFA 1 — Drop Page Fullscreen Premium (`src/pages/DropPage.tsx`)

Reescrever completamente a página /drop:
- Layout split 50/50 desktop: foto esquerda (Unsplash polo `photo-1581655353564-df123a1eb820`) fullscreen `object-cover` com badges flutuantes ("🔥 DROP EXCLUSIVO #07" coral pill + "8/15 UNIDADES" com progress bar)
- Lado direito fundo ocean-950: tag "NOVA COLEÇÃO 2025" teal, countdown blocos 100×100px com Bebas Neue 80px, nome produto Bebas Neue 3rem, preço coral + riscado, barra de escassez animada, seletor de tamanho P|M|G|GG, 2 CTAs (GARANTIR AGORA teal 56px + AVISAR outline branco legível)
- Seção abaixo: "POR QUE OS DROPS ESGOTAM?" 3 cards dark + histórico 3 drops anteriores com overlay "ESGOTADO"
- Mobile: stack vertical foto 50vh + info + CTAs sticky

---

### TAREFA 2 — Outfit Builder Preview Visual (`src/pages/OutfitBuilderPage.tsx`)

Elevar sidebar "SEU LOOK":
- Cada peça selecionada mostra thumbnail 80×80px + nome + preço + botão X remover
- Placeholders com ícone de cada tipo de peça quando não selecionada
- Total animado com Space Grotesk coral
- Botão "COMPARTILHAR LOOK" que gera link WhatsApp com os SKUs selecionados
- Cards de peça: selecionado com borda coral 2px + check coral + scale(1.02), hover não selecionado com borda teal/30%
- Progress steps: ativo coral sólido, completo check teal, futuro cinza, linha conectora teal quando completo

---

### TAREFA 3 — Looks da Semana Premium (`src/components/home/LooksSection.tsx`)

Atualizar dados dos looks em `products.ts` para 5 looks com novos nomes (Navy Total, Sand & Sea, Dark Ocean, Tropical Vibes, Sunset Beach) e preços. Reescrever LooksSection:
- Badge preço coral pill no canto sup esq, nome look no canto sup dir
- Hover premium: overlay navy-950 0→70%, lista de peças com foto mini + nome + preço fade-up staggered, separador, total, 2 CTAs "MONTAR LOOK" coral + "VER PEÇAS" outline
- CTA de seção: "VER TODOS OS LOOKS →" ao lado do título

---

### TAREFA 4 — Depoimentos "Quem Aloha, Chega" (`src/components/home/SocialProofSection.tsx`)

Reescrever com fundo navy-950 (dark ocean):
- 8 depoimentos no carrossel (dados do prompt: João V., Felipe M., Lucas R., André S., Bruno L., Mateus C. + 2 extras)
- Cards: fundo ocean-800, borda coral/20%, border-radius 16px, avatar círculo teal com iniciais
- Desktop: 3 visíveis + arrows coral + dots; Mobile: scroll snap 1 visível
- Autoplay 4s, pause on hover
- CTA: "VER MAIS AVALIAÇÕES NO INSTAGRAM →" + rating "⭐ 4.9 — 127 avaliações"

---

### TAREFA 5 — PDP Premium (`src/pages/ProductPage.tsx`)

Elevar a página de produto:
- Galeria: aspect 4:5, fundo ocean-900 para polo/bermuda/boné, fundo creme para óculos
- Badge status padronizado (MAIS PEDIDO teal, DROP EXCLUSIVO coral pulse, NOVO dourado)
- Info: categoria Bebas Neue uppercase teal, nome Syne 2.8rem, SKU Space Grotesk gray-400
- Seletor tamanho: botões 48×36px ocean-800, indisponível cinza com linha diagonal
- 3 CTAs: ADICIONAR navy-950 52px, WHATSAPP coral outline, SALVAR link
- Bloco "COMBINE COM": mini carrossel 3 peças + botão "+" + link montar look
- Tabs descrição: copy lifestyle streetwear + especificações tabela dark
- Mobile sticky bar 60px: preço coral + ADICIONAR + WA ícone

---

### TAREFA 6 — Seção Instagram/Comunidade (novo componente `src/components/home/InstagramSection.tsx`)

Nova seção antes do footer em Index.tsx:
- Fundo off-white creme
- Título Bebas Neue "A COMUNIDADE ALOHA" + subtítulo "+35 mil seguidores"
- Grid 3×2 desktop / 2×3 mobile com 6 fotos Unsplash fashion
- Hover: overlay navy-950/70% + ícone coração + "Ver no Instagram"
- CTA coral: "SEGUIR @ALOHA_SURF_CONCEITO →"
- Subtext: "Mostre seu look com #AlohaEstiloCerto"

---

### TAREFA 7 — Tipografia Polish

Já está configurado corretamente no `tailwind.config.ts` e `index.css`. Ajustes finais:
- Verificar que CTAs de botões usam `font-display uppercase tracking-widest`
- Line-height 0.9 nos títulos hero (já `leading-[0.95]`, ajustar para 0.9)
- Letter-spacing 0.15em nos subtítulos de seção

---

### TAREFA 8 — Cards Produto Premium (`src/components/home/ProductsSection.tsx`)

Redesenhar ProductCard:
- Card: bg-white, border sand-200, rounded-[16px], hover translateY(-6px) + shadow profundo
- Foto aspect 1:1, fundo ocean-900 para polo/bermuda/boné, creme para óculos, object-contain, hover scale(1.04)
- Badge: MAIS PEDIDO → teal/navy-950 Bebas Neue; DROP → coral pulse; NOVO → dourado
- Coração: outline branco/60% → filled coral com scale(1.2) animation
- Swatches 14px, max 4 + "+X"
- Hover CTAs fade-up: "ADICIONAR À SACOLA" navy-950 outline + "MONTAR LOOK" coral pill
- Categoria font-display teal tracking-widest

---

### Resumo de arquivos

| Arquivo | Mudança |
|---------|---------|
| `src/pages/DropPage.tsx` | Reescrita completa — split fullscreen premium |
| `src/pages/OutfitBuilderPage.tsx` | Preview visual sidebar, thumbnails, share WhatsApp |
| `src/pages/ProductPage.tsx` | PDP premium com galeria, sticky bar mobile |
| `src/components/home/LooksSection.tsx` | Hover com lista de peças, preços, CTAs |
| `src/components/home/SocialProofSection.tsx` | Dark ocean, 8 depoimentos, carrossel |
| `src/components/home/ProductsSection.tsx` | Cards premium, badges padronizados |
| `src/components/home/InstagramSection.tsx` | **Novo** — seção comunidade Instagram |
| `src/data/products.ts` | Atualizar looks com novos nomes/preços |
| `src/pages/Index.tsx` | Adicionar InstagramSection antes do WhatsAppCTA |
| `src/components/home/HeroSection.tsx` | Ajuste leading-[0.9] |

