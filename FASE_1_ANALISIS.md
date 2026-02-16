# 📊 FASE 1 — ANÁLISIS COMPLETO
## Sistema de Diseño Figma vs. Implementación Actual

**Proyecto:** noah (anteriormente memora)
**Framework:** Next.js 16.1.6 + React 19.2.3
**Estilos:** Tailwind CSS v4 + CSS Variables
**Fecha:** 2026-02-16

---

## 🎨 1. PALETA DE COLORES

### FIGMA (Diseño Original)
```css
/* 7 colores principales - Paleta minimalista */
--color-black: #000000
--color-slate-900: #0f172a
--color-slate-800: #1e1e1e
--color-slate-700: #151515
--color-gray: #323232
--color-lime-brand: #d6ff81      /* ⭐ COLOR BRAND PRINCIPAL */
--color-neutral-100: #f0efea
--color-neutral-50: #fafaf7
--color-white: #ffffff
```

### IMPLEMENTACIÓN ACTUAL
```css
/* Paleta más extensa basada en azules + grises */
--color-blue-600: #0066c4        /* Brand actual (azul) */
--color-blue-500: #0075de
--color-blue-200: #cce7fc
--gray-50 a gray-950 (escala completa)
--off-white: #fafaf7             /* ✓ Coincide */
--ink: #0f172a                   /* ✓ Coincide (slate-900) */
--sage: #000                     /* Renombrado a "sage" */
```

### ⚠️ DIFERENCIAS CRÍTICAS
1. **Color Brand**: Figma usa `#d6ff81` (verde lima) vs. Actual usa `#0066c4` (azul)
2. **Paleta**: Figma es minimalista (7 colores) vs. Actual es extensa (20+ colores)
3. **Sistema**: Figma no usa escala blue-*, usa black/slate/lime

---

## 🔤 2. TIPOGRAFÍA

### FIGMA (Diseño Original)

#### Familias
- **Aspekta** (Weight 450) — Display/Hero
- **Inter** (Weights: 400, 500, 600, 800) — Sans-serif principal

#### Escala Tipográfica Figma
| Token | Tamaño | Line Height | Weight | Uso |
|-------|--------|-------------|--------|-----|
| `5xl` | 120px | 132px | 600 | Hero XL |
| `4xl` | 64px | 76.8px | 800 | Hero L |
| `2xl` | 42px | 48px | 800 | Hero M |
| `xl` | 36px | 43.6px | 600 | H1 |
| `lg` | 18px | 28.8px | 400 | Body L |
| `md` | 16px | 25.6px | 400/600 | Body M |
| `base` | 14px | 20px | 400/500/600 | Body S |

#### Letter Spacing Figma
- **Display grande**: `-2.4px` a `-2.0px` (tracking negativo)
- **Body**: `0px` (sin tracking)
- **Labels**: `+3.8px` a `+5.07px` (tracking positivo)

### IMPLEMENTACIÓN ACTUAL

#### Familias
- **Inter** (variable) — Sans-serif
- **Source Serif 4** (variable) — Serif para quotes *(No en Figma)*

#### Escala Actual
```css
--fs-h1: 48px (line: 1.2)    /* vs Figma: 120px */
--fs-h2: 36px (line: 1.3)    /* vs Figma: 64px */
--fs-h3: 30px (line: 1.3)    /* vs Figma: 42px */
--fs-body: 18px (line: 1.6)  /* ✓ Similar */
--fs-btn: 18px (line: 1.4)
```

### ⚠️ DIFERENCIAS CRÍTICAS
1. **Fuente Display**: Figma usa Aspekta, Actual solo usa Inter
2. **Tamaños Hero**: Figma tiene heros MUCHO más grandes (120px vs 48px)
3. **Line Heights**: Figma usa píxeles absolutos, Actual usa unitless
4. **Serif**: Actual tiene Source Serif 4 (no en Figma)
5. **Letter Spacing**: Actual no implementa tracking negativo en displays

---

## 📐 3. ESPACIADO

### FIGMA
```javascript
// Sistema sugerido de Figma (normalizado)
spacing: {
  0.5: '2px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
}
```

### IMPLEMENTACIÓN ACTUAL
```css
/* Valores hardcoded en globals.css */
--spacing-4: 0.25rem (4px)
--spacing-8: 0.5rem (8px)
--spacing-24: 1.5rem (24px)  /* ✓ Coincide */
--spacing-28: 1.75rem (28px)
--spacing-32: 2rem (32px)     /* ✓ Coincide */
--spacing-160: 10rem (160px)

/* Tailwind default scale también disponible */
```

### ⚠️ DIFERENCIAS
1. **Escala base**: Figma tiene más variedad (12, 16, 20, 40, 48)
2. **Valores custom**: Actual tiene spacing-28 y spacing-160 (no en Figma)

---

## 🔲 4. BORDER RADIUS

### FIGMA
```css
--radius-sm: 8px
--radius-md: 10px
--radius-lg: 55px
--radius-full: 9999px
```

### IMPLEMENTACIÓN ACTUAL
```css
--radius: 0.625rem (10px)        /* ✓ Base coincide */
--radius-sm: calc(var(--radius) - 4px)  /* 6px */
--radius-md: calc(var(--radius) - 2px)  /* 8px */
--radius-lg: var(--radius)               /* 10px */
--radius-xl: calc(var(--radius) + 4px)   /* 14px */
--radius-2xl: calc(var(--radius) + 8px)  /* 18px */
--radius-3xl: calc(var(--radius) + 12px) /* 22px */
--radius-4xl: calc(var(--radius) + 16px) /* 26px */
```

### ⚠️ DIFERENCIAS
1. **Escala**: Actual tiene 7 niveles vs Figma 4 niveles
2. **Valores**: Actual no tiene radius-55px (Figma lg)
3. **Naming**: Invertido (sm/md/lg significan cosas diferentes)

---

## 🌫️ 5. EFECTOS

### FIGMA
```css
/* NO hay sombras DROP_SHADOW */
/* Diseño flat/minimalista */

/* Background blur */
--blur-xl: 200px  /* Para overlays/modals */
```

### IMPLEMENTACIÓN ACTUAL
```css
/* Sombras definidas */
box-shadow: 0 14px 40px rgba(15, 23, 42, 0.14)  /* Navbar, cards */
--shadow-level-200: 0 14px 40px rgba(15, 23, 42, 0.14)

/* No hay backdrop-blur definido */
```

### ⚠️ DIFERENCIAS
1. **Sombras**: Actual usa sombras sutiles, Figma es totalmente flat
2. **Blur**: Figma usa backdrop-blur 200px, Actual no lo implementa

---

## 📱 6. BREAKPOINTS

### FIGMA
```css
--breakpoint-sm: 390px   /* Mobile */
--breakpoint-md: 768px   /* Tablet */
--breakpoint-lg: 1440px  /* Desktop */
```

### IMPLEMENTACIÓN ACTUAL
```css
/* Tailwind CSS default */
sm: 640px    /* ⚠️ No coincide */
md: 768px    /* ✓ Coincide */
lg: 1024px   /* ⚠️ No coincide */
xl: 1280px
2xl: 1536px
```

### ⚠️ DIFERENCIAS
1. **Mobile**: Figma 390px vs Tailwind 640px
2. **Desktop**: Figma 1440px vs Tailwind 1024px/1280px
3. **Estrategia**: Figma es 3-tier, Actual usa 5-tier

---

## 🧩 7. COMPONENTES PRINCIPALES

### COMPONENTES EN FIGMA (Identificados)

#### Navegación
- **Nav**: 3 variantes responsive
  - Desktop: 1440w × 83h
  - Tablet: 768w × 80h
  - Mobile: 390w × 68h

#### Botones
- **Button - Open menu**: 40w × 40h
- Links con hover states
- CTAs primary/secondary

#### Layout
- **Container**: 47 instancias
- **Main → Section**: 3 variantes responsive

#### Tipografía
- **Heading 1**: 3 tamaños responsive
- **Heading 3**: Para subtítulos
- **Body text**: 14/16/18px

#### UI Elements
- **Logo**: 101w × 39h (6 instancias)
- **User avatar**: 110w × 110h
- **Social icons**: 20w × 20h
- **HorizontalBorder**: Separadores

#### Footer
- **Footer**: 3 variantes responsive
  - Desktop: 1440w × 376h
  - Tablet: 768w × 367h
  - Mobile: 390w × 603h

### COMPONENTES IMPLEMENTADOS ACTUALMENTE

```
/components/ui/
  ✓ button.tsx (3 variantes: primary, secondary, ghost)
  ✓ card.tsx
  ✓ badge.tsx
  ✓ accordion.tsx
  ✓ separator.tsx

/components/
  ✓ site-navbar.tsx (responsive con mobile menu)
  ✓ footer.tsx (4 columnas, responsive)

/components/pro-blocks/
  ✓ hero-section
  ✓ features-section
  ✓ testimonials-section
  ✓ pricing-section
  ✓ faq-section
  ✓ cta-section
```

### ⚠️ ANÁLISIS DE COMPONENTES
1. **Button**: ✅ Existe pero estilos no coinciden con Figma
2. **Navbar**: ✅ Existe pero diseño/colores diferentes
3. **Footer**: ✅ Existe pero layout diferente
4. **Container**: ❌ No implementado como componente
5. **Avatar/User**: ❌ No existe
6. **Icons**: ✅ Usa lucide-react (compatible)

---

## 📄 8. PÁGINAS DETECTADAS

### En Figma
- Homepage con 3 breakpoints (390/768/1440)
- Single page design (hero, features, footer)

### Implementadas Actualmente
```
/app/page.tsx                    → Homepage (hero-only)
/app/acta/page.tsx              → Ver ejemplo de acta
/app/contacto/page.tsx          → Contacto
/app/faq/page.tsx               → FAQ
/app/generar-acta/page.tsx      → Generador principal
/app/pricing/page.tsx           → Pricing
/app/comunidades/1/configuracion/page.tsx  → Config
```

### ⚠️ OBSERVACIONES
- Actual tiene más páginas que el diseño Figma
- Figma solo muestra homepage/landing
- Páginas internas sin diseño en Figma

---

## 📊 9. RESUMEN COMPARATIVO

### ✅ COINCIDENCIAS
1. **Breakpoint Tablet**: 768px
2. **Espaciado base**: 24px, 32px
3. **Color base**: `#fafaf7` (off-white)
4. **Fuente Inter**: Usada en ambos
5. **Body text**: 18px es común
6. **Estructura responsive**: Ambos mobile-first

### ⚠️ DIFERENCIAS MAYORES

#### 🔴 CRÍTICAS (Requieren cambio)
1. **Color Brand**: Verde lima `#d6ff81` (Figma) vs Azul `#0066c4` (Actual)
2. **Fuente Display**: Aspekta (Figma) vs Inter (Actual)
3. **Hero sizes**: 120px (Figma) vs 48px (Actual) — 2.5x más grande
4. **Sombras**: Flat (Figma) vs Con sombras (Actual)
5. **Paleta**: Minimalista 7 colores (Figma) vs Extensa 20+ (Actual)

#### 🟡 IMPORTANTES (Deberían cambiar)
1. **Breakpoints**: 390px mobile (Figma) vs 640px (Tailwind)
2. **Desktop**: 1440px (Figma) vs 1024px (Tailwind)
3. **Border radius naming**: Valores invertidos
4. **Letter spacing**: Negativo en displays (Figma), ausente (Actual)
5. **Blur effects**: backdrop-blur 200px (Figma), no implementado (Actual)

#### 🟢 MENORES (Opcionales)
1. **Source Serif 4**: Existe en Actual, no en Figma
2. **Escala de radius**: 7 niveles (Actual) vs 4 (Figma)
3. **Spacing custom**: spacing-160, spacing-28 en Actual

---

## 🎯 10. PLAN DE IMPLEMENTACIÓN SUGERIDO

### FASE 2 — Sistema de Diseño Base
**Prioridad: CRÍTICA**

1. **Colores**
   - [ ] Reemplazar sistema azul por verde lima `#d6ff81`
   - [ ] Simplificar paleta a 7 colores Figma
   - [ ] Actualizar variables CSS en globals.css
   - [ ] Migrar de blue-* a lime-*/slate-*

2. **Tipografía**
   - [ ] Agregar fuente Aspekta para displays
   - [ ] Actualizar escala h1 (48→120px), h2 (36→64px)
   - [ ] Implementar letter-spacing negativo en displays
   - [ ] Convertir line-heights a píxeles absolutos
   - [ ] Decidir si mantener Source Serif 4

3. **Espaciado**
   - [ ] Normalizar spacing tokens según Figma
   - [ ] Agregar spacing-12, spacing-40, spacing-48

4. **Border Radius**
   - [ ] Realinear naming (sm=8px, md=10px, lg=55px)
   - [ ] Agregar radius-55px para elementos destacados

5. **Efectos**
   - [ ] Eliminar/reducir box-shadows (diseño flat)
   - [ ] Implementar backdrop-blur 200px para overlays

6. **Breakpoints**
   - [ ] Override Tailwind: sm=390px, lg=1440px
   - [ ] Actualizar tailwind.config

### FASE 3 — Componentes
**Prioridad: ALTA**

1. **Button**
   - [ ] Actualizar variantes primary/secondary con nuevo brand color
   - [ ] Verificar estados hover/active
   - [ ] Tamaños según Figma

2. **Navbar**
   - [ ] Rediseñar con colores Figma
   - [ ] Ajustar heights (83h desktop, 80h tablet, 68h mobile)
   - [ ] Logo nuevo si aplica

3. **Footer**
   - [ ] Ajustar layout según Figma
   - [ ] Heights responsivos (376/367/603)
   - [ ] Colores actualizados

4. **Container**
   - [ ] Crear componente Container reutilizable
   - [ ] Max-widths por breakpoint

5. **Nuevos componentes**
   - [ ] Avatar/User (110×110)
   - [ ] Overlay con blur
   - [ ] HorizontalBorder separator

### FASE 4 — Páginas
**Prioridad: MEDIA**

1. **Homepage**
   - [ ] Aplicar hero XL (120px) con Aspekta
   - [ ] Layout según Figma 1440/768/390
   - [ ] Nuevo color brand en CTAs

2. **Páginas Internas**
   - [ ] Aplicar sistema de diseño consistente
   - [ ] Sin diseño específico en Figma, seguir patrones homepage
   - [ ] Responsive según breakpoints

---

## 🚨 11. DECISIONES PENDIENTES

### Para discutir antes de implementar:

1. **Color Brand**
   - ¿Confirmas cambio de azul a verde lima?
   - ¿Es un rebrand completo?

2. **Fuente Aspekta**
   - ¿Tienes licencia de Aspekta?
   - ¿O buscar alternativa similar?
   - ¿O usar Inter 800 como fallback?

3. **Source Serif 4**
   - ¿Mantener para quotes/testimonials?
   - No está en Figma pero puede ser útil

4. **Sombras**
   - ¿Eliminar completamente para diseño flat?
   - ¿O mantener muy sutiles?

5. **Páginas sin diseño**
   - /acta, /contacto, /faq, /generar-acta, /pricing
   - ¿Aplicar solo sistema de diseño base?
   - ¿O esperar diseños específicos?

6. **Hero sizes**
   - 120px es muy grande para web
   - ¿Escalar proporcionalmente o usar valores exactos?

---

## 📋 12. CHECKLIST DE VERIFICACIÓN

Antes de comenzar FASE 2, confirmar:

- [ ] Color brand verde lima es definitivo
- [ ] Tienes fuente Aspekta o alternativa aprobada
- [ ] OK eliminar sombras (diseño flat)
- [ ] OK cambiar breakpoints (390/768/1440)
- [ ] OK tamaños de hero grandes (120px desktop)
- [ ] Decisión sobre Source Serif 4
- [ ] Alcance de páginas a rediseñar

---

## 📁 13. ARCHIVOS CLAVE A MODIFICAR

### Fase 2 (Sistema Base)
```
/app/globals.css              → Tokens de colores, tipografía, spacing
/tailwind.config.ts           → Breakpoints, theme overrides (si aplica)
/postcss.config.mjs           → Config OK, no cambios
```

### Fase 3 (Componentes)
```
/components/ui/button.tsx     → Actualizar estilos
/components/site-navbar.tsx   → Rediseño completo
/components/footer.tsx        → Ajustes de layout
/components/ui/container.tsx  → CREAR NUEVO
/components/ui/avatar.tsx     → CREAR NUEVO
```

### Fase 4 (Páginas)
```
/app/page.tsx                        → Hero principal
/components/pro-blocks/...           → Secciones de landing
/app/[otras-páginas]/page.tsx       → Aplicar sistema
```

---

## ✅ CONCLUSIÓN FASE 1

El análisis está **completo**. El sistema de diseño de Figma difiere significativamente de la implementación actual, especialmente en:

1. **Color brand** (verde lima vs azul) — cambio de identidad
2. **Tipografía** (Aspekta + tamaños grandes) — requiere nueva fuente
3. **Estilo visual** (flat vs con sombras) — cambio de filosofía

**RECOMENDACIÓN**: Confirmar decisiones de diseño críticas antes de proceder a FASE 2.

**NO IMPLEMENTAR** hasta recibir confirmación y aprobación de este análisis.

---

**Generado:** 2026-02-16
**Por:** Claude Code Analysis System
**Estado:** ✅ FASE 1 COMPLETA — ESPERANDO APROBACIÓN
