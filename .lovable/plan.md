

## Problema

A cor `sand` no Tailwind config não tem valor `DEFAULT`. Classes como `text-sand`, `text-sand/80`, `bg-sand` não funcionam — resultam em cor invisível. Isso afeta o menu mobile, header, e vários outros componentes que usam `text-sand`.

## Solução

Adicionar `DEFAULT` ao objeto `sand` no `tailwind.config.ts` apontando para `sand-50` (#FDFBF7). Fazer o mesmo para `ocean`, `teal` e `coral` que também não têm DEFAULT e são usados como `bg-ocean`, `text-coral`, etc.

### Arquivo: `tailwind.config.ts`

Adicionar DEFAULT a cada grupo de cores:

```ts
ocean: {
  DEFAULT: "hsl(var(--ocean-950))",  // usado como bg-ocean, text-ocean
  950: "hsl(var(--ocean-950))",
  // ...
},
sand: {
  DEFAULT: "hsl(var(--sand-50))",    // usado como text-sand, bg-sand
  50: "hsl(var(--sand-50))",
  // ...
},
teal: {
  DEFAULT: "hsl(var(--teal-500))",
  // ...
},
coral: {
  DEFAULT: "hsl(var(--coral-500))",
  // ...
},
```

Isso corrige imediatamente: menu mobile, header links, hero text, footer, bottom nav, e todos os componentes que usam `text-sand`, `bg-ocean`, `text-coral`, `bg-teal`.

