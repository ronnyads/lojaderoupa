

## Plano de Correção e Elevação — ALOHA SURF CONCEITO

Este plano aborda os 8 prompts de correção em ordem de prioridade, organizados em tarefas de implementação.

---

### TAREFA 1 — Fontes (impacto imediato)

**Problema:** As fontes já estão importadas no `src/index.css` e configuradas no `tailwind.config.ts`, mas o `font-display` usa `"Bebas Neue"` sem aspas corretas em alguns contextos. Os componentes já usam `font-display` corretamente.

**Ação:** Verificar e corrigir o import no `index.css` (já presente). Ajustar o tailwind config para usar aspas duplas em `"Bebas Neue"` e `"DM Sans"` e `"Space Grotesk"`. Garantir que o `index.html` tenha um `<link>` preconnect para `fonts.googleapis.com` no `<head>` para carregamento rápido.

---

### TAREFA 2 — Looks da Semana (seção vazia)

**Problema:** O componente `LooksSection.tsx` já existe e renderiza os 3 looks do `products.ts`, mas usa gradientes placeholder em vez de imagens reais. Com apenas 3 looks e sem fotos, a seção parece vazia.

**Ação:**
- Expandir o array `looks` em `products.ts` de 3 para 6 looks (Navy Total, Caqui+Navy, Branco e Preto, Verde Militar, Bordô+Cinza, Drop Exclusivo)
- Adicionar campo `image` a cada look com URLs Unsplash de moda masculina
- Reescrever `LooksSection.tsx`: cards com foto fullbleed, overlay gradient, hover com tags de produto + botão "COMPRAR ESSE LOOK", coração de favorito
- Desktop: grid 3 colunas com look 1 span 2 colunas; Mobile: 2 colunas

---

### TAREFA 3 — Depoimentos (Social Proof vazio)

**Problema:** `SocialProofSection.tsx` tem 6 reviews mas pode parecer vazio dependendo do scroll horizontal. Os cards não têm avatar com iniciais coloridas, nem produto associado, nem estrelas douradas visíveis.

**Ação:**
- Atualizar os 6 reviews com novos dados mais detalhados (nome, avatar cor, produto associado)
- Redesenhar cards: fundo branco, border-left coral, avatar com iniciais coloridas, estrelas douradas, produto miniatura
- Layout: carrossel com 3 cards visíveis desktop, scroll snap mobile
- Adicionar contador "⭐ 4.9 — Baseado em 148 avaliações" abaixo

---

### TAREFA 4 — Header completo (navegação)

**Problema:** `Header.tsx` já tem 7 itens de nav (`navItems`), incluindo LOOKS, POLOS, BERMUDAS, BONÉS, ÓCULOS, DROP, SOBRE. O menu desktop está implementado.

**Ação:** O header já está correto com navegação completa. Verificar se está visível (o CSS pode estar ocultando). Ajustar estilos: links com `font-body text-xs uppercase tracking-wider`, hover com `border-bottom 2px coral`. Garantir que ícones direita (busca, coração, sacola, WhatsApp) estejam todos visíveis.

---

### TAREFA 5 — Monte Seu Conjunto (imagens e UX)

**Problema:** `KitBuilderSection.tsx` usa `getProductImage()` que já retorna imagens. Porém pode ter produtos sem imagem mapeada.

**Ação:**
- Verificar que todos os 15 SKUs têm imagem em `productImages.ts`
- Adicionar checkmark visual no card selecionado
- Adicionar thumbnails 48x48 dos itens selecionados no painel "SEU KIT"
- Botão CTA coral full-width 52px, com link WhatsApp abaixo

---

### TAREFA 6 — Correções de contraste e bugs visuais

**Ações específicas:**
1. **Botão "AVISAR QUANDO SAIR"** em `DropSection.tsx` linha 120: mudar para `text-sand border-sand/60 hover:bg-sand/10`
2. **Padronizar badges** em `ProductsSection.tsx`: atualizar `badgeStyles` para cores consistentes (MAIS PEDIDO → ocean-800/teal-400, NOVO DROP → teal-900/teal-400, DROP EXCLUSIVO → coral/branco, PROMOÇÃO → coral-100/coral-500, NOVO → ocean-700/branco)
3. **Fundo da vitrine**: já usa `bg-sand`, confirmar cards com `bg-white border border-sand-200`

---

### TAREFA 7 — Cards de produto premium

**Ação:** Redesenhar `ProductCard` em `ProductsSection.tsx`:
- Card: `bg-white border border-sand-200 rounded-[14px]` com hover `translateY(-6px)` + shadow elevado
- Foto aspect 3:4 com `object-contain` e fundo sand-100
- Swatches com tooltip no hover
- Categoria em teal-500 0.65rem uppercase
- Preço em Space Grotesk coral, parcelamento em gray-500
- Botões de ação aparecem no hover: ADICIONAR (coral full-width) + VER (outline)

---

### TAREFA 8 — Mobile polish + refinamentos finais

**Ações:**
- WhatsApp float: ajustar `bottom: 76px` no mobile para ficar acima do bottom nav (já está `bottom-20` = 80px, correto)
- Hero mobile: single panel com foto fullscreen + overlay gradient + CTAs sobre
- Padding do body para compensar bottom nav mobile: `pb-16 lg:pb-0` no layout principal
- Toast ao adicionar produto (usar Sonner)
- Alt texts descritivos em todas as imagens
- `scroll-behavior: smooth` no CSS global
- Footer com padding-bottom extra no mobile para não ficar atrás do bottom nav

---

### Resumo de arquivos a modificar

| Arquivo | Mudanças |
|---------|----------|
| `index.html` | Adicionar preconnect fonts |
| `src/index.css` | scroll-behavior smooth, ajustes |
| `tailwind.config.ts` | Aspas corretas nas fontes |
| `src/data/products.ts` | Expandir looks de 3→6 com URLs de imagem |
| `src/components/home/LooksSection.tsx` | Reescrever com fotos e hover premium |
| `src/components/home/SocialProofSection.tsx` | Redesenhar com avatares coloridos, produto associado, estrelas |
| `src/components/home/ProductsSection.tsx` | Redesenhar cards premium, padronizar badges |
| `src/components/home/DropSection.tsx` | Fix contraste botão "AVISAR" |
| `src/components/home/KitBuilderSection.tsx` | Checkmark, thumbnails no resumo, CTA melhorado |
| `src/components/home/HeroSection.tsx` | Versão mobile simplificada |
| `src/components/layout/Header.tsx` | Ajustar estilos de hover nos links |
| `src/App.tsx` | Padding bottom mobile |

