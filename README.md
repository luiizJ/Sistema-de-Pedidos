# 🍔 FastFood System - Fullstack Delivery Experience

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-success?logo=vercel)](https://sistema-de-pedidos-wine.vercel.app/)
[![Database: NeonDB](<https://img.shields.io/badge/Database-NeonDB%20(PostgreSQL)-blue?logo=postgresql>)](https://neon.tech/)

Solução de cardápio digital projetada para maximizar a conversão de pedidos através de uma interface de alta performance. Desenvolvido para atuar como o front-end de um modelo SaaS, focado em comércios que buscam agilidade e presença digital mobile-first.

---

## 🚀 Arsenal Tecnológico

- **Biblioteca Base:** React (Componentização modular).
- **Framework:** Next.js 15 (App Router, SSR/SSG para SEO otimizado).
- **Linguagem:** TypeScript (Tipagem estrita e segurança de dados).
- **Banco de Dados:** NeonDB (PostgreSQL Serverless para persistência escalável).
- **ORM:** Drizzle ORM (Type-safe database operations).
- **Estilização:** TailwindCSS & ShadCN/UI (Interface moderna e responsiva).
- **Gerenciamento de Estado:** Zustand (Carrinho leve com sincronização de hidratação).

---

## ⚙️ Funcionalidades Core

### 1. Experiência de Compra (Client Side)

- **Cardápio Dinâmico:** Navegação intuitiva por categorias (Sushi, Hambúrguer, Bebidas) com interface responsiva.
- **Carrinho Persistente:** Gestão de itens via Zustand, permitindo adição de quantidades e cálculo de subtotal instantâneo.
- **Checkout Inteligente:** Fluxo de dados estruturado (Nome, Endereço e Forma de Pagamento) com integração direta ao WhatsApp.

### 2. Gestão Administrativa (Server Side)

- **Painel Protegido:** Área administrativa blindada por senha para controle total do estabelecimento.
- **Real-time Status:** Alteração dinâmica do status da loja (Aberto/Fechado). Quando fechada, o sistema desabilita pedidos automaticamente via `revalidatePath`.

---

## 🛡️ Arquitetura e Segurança

O projeto utiliza **Server Actions** com dupla camada de validação. Toda tentativa de alteração no banco de dados confere a autenticidade da senha no lado do servidor antes de processar a operação, garantindo a integridade dos dados e a segurança das configurações do lojista.

A infraestrutura foi desenhada para **Zero Layout Shift** e performance otimizada, refletindo um mindset de alta performance tanto no hardware quanto no software.

---

## 🔧 Como Rodar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/luiizJ/Sistema-de-Pedidos.git](https://github.com/luiizJ/Sistema-de-Pedidos.git)
    ```
2.  **Instale as dependências:**
    ```bash
    pnpm install
    ```
3.  **Configure as variáveis de ambiente (.env.local):**
    ```env
    DATABASE_URL=sua_url_do_neondb
    ADMIN_PASSWORD=sua_senha_secreta
    ```
4.  **Execute o servidor:**
    ```bash
    pnpm dev
    ```

---

## 👤 Desenvolvedor

**Luiz Everson** _Desenvolvedor Front-end / Tecnólogo em Análise e Desenvolvimento de Sistemas (UNIESP)_.
