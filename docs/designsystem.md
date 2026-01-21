# Lykos Design System

Este documento descreve o **Design System oficial do Lykos**, sua filosofia, tokens, componentes e regras de uso. Ele serve como **fonte única de verdade** para design e frontend.

---

## Objetivos

* Garantir **consistência visual** em todo o produto
* Facilitar manutenção e evolução
* Evitar CSS duplicado e decisões isoladas
* Permitir **Light / Dark Mode** sem retrabalho

---

## Princípios Fundamentais

### 1. Tokens > Componentes > Páginas

* **Tokens** definem valores (cores, espaçamentos, fontes)
* **Componentes** consomem tokens
* **Páginas não decidem design**

### 2. Semântica acima de estética

* Usamos `primary`, `success`, `error`
* Nunca usamos cores diretas (`#hex`) em componentes

### 3. Um componente = um visual

* Um botão, um card, um input
* Variações controladas, não infinitas

---

## Cores

### Escalas disponíveis

* Primary (ouro Lykos)
* Secondary
* OffWhite
* Dark Blue (dark theme)
* Light Blue

### Tokens semânticos

* `--ui-primary`
* `--ui-secondary`
* `--ui-bg`
* `--ui-text`
* `--ui-border`

Nunca usar cores diretamente

---

## Spacing

Escala baseada em `rem`:

* `--space-1` → 4px
* `--space-4` → 16px
* `--space-7` → 32px

Uso:

* Padding
* Margin
* Gap

---

## Radius

Identidade visual suave:

* `--radius-sm`
* `--radius-md`
* `--radius-lg`
* `--radius-full`

---

## Tipografia

### Fonte

* Inter (sans-serif)

### Escala

* `--text-sm` (14px)
* `--text-md` (16px)
* `--text-lg` (18px)
* `--text-xl` (20px)

### Pesos

* Regular (400)
* Medium (500)
* Semibold (600)
* Bold (700)

---

## Botões

### Componente

* `UButton`

### Variantes

* Primary (ação principal)
* Secondary (outline)
* Ghost (ação contextual)

### Regras

* Sempre usar `UButton`
* Nunca criar botão manual

---

## Cards

### Componente

* `UCard`

### Características

* Fundo elevado
* Sombra leve
* Padding padronizado

### Uso comum

* Listagens
* Dashboards
* Detalhes

---

##️ Inputs & Forms

### Componentes

* `UInput`
* `UTextarea`
* `USelect`

### Estados

* Default
* Focus
* Error
* Disabled

### Regra

* Forms nunca definem cor ou borda manualmente

---

##️ Badges & Status

### Componente

* `UBadge`

### Status oficiais

* Success
* Warning
* Error
* Info

Uso:

* Pedido
* Pagamento
* Estado de entidade

---

## Alertas & Toasts

### Alert

* Mensagem fixa
* Contextual

### Toast

* Feedback temporário
* Ações rápidas

Ambos reutilizam tokens de status

---

## Tema (Light / Dark)

### Estratégia

* CSS Variables
* Classe `.dark`
* `@nuxtjs/color-mode`

### Regra

* Componentes não sabem se estão em dark ou light

---

## O que NÃO fazer

Usar `#hex` em componentes
Criar componentes fora do DS
Decidir design na página
Duplicar estilos

---

## O que SEMPRE fazer

Usar tokens
Usar Nuxt UI
Centralizar decisões
Evoluir o Design System

---

## Conclusão

O Design System do Lykos é uma **fundação de produto**, não um detalhe visual.

> Tokens mandam. Componentes obedecem. Páginas consomem.

---

**Versão:** 1.0.0
**Produto:** Lykos
