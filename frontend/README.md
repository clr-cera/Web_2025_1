## ElementStore – Loja de Elementos Químicos

Este é um projeto web completo desenvolvido com **Next.js**, que simula uma loja de elementos químicos. Nele, usuários podem visualizar elementos da tabela periódica, adicioná-los ao carrinho, realizar um checkout e administradores podem gerenciar produtos e contas via painel administrativo.

---

### Tecnologias utilizadas

* [Next.js](https://nextjs.org/) - Utilizada como biblioteca para o React, que permite diversas praticidades, como gerenciamente automatico de paginas e rotas, execução em client-side/server-side etc.
* [React](https://reactjs.org/) - Tecnologia escolhida para fazer o projeto
* [TypeScript](https://www.typescriptlang.org/) - Usada para tipagem do js e jsx
* [Tailwind CSS](https://tailwindcss.com/) - Tecnologia focada em fazer design da aplicação sem utilizar css puro, podemos por exemplo `className: text-xl font-bold`, nesse exemplo estamos colocando texto de tamanho grande e deixando o texto em negrito
* [JSON Server](https://github.com/typicode/json-server) - (mock da API), utilizado nessa entrega como alternativa ao backend para verificar funcionalidades do frontend
* [React Icons](https://react-icons.github.io/react-icons/) - Icones
* `react-hot-toast`, `react-context`, etc.  - hot-toast para lidar com mensagens para o usuário e react-context para podermos tratar estados (states) fora dos componentes, de forma global utilizando contextos e providers

---

## Instalação (como rodar o projeto)

1. **Clone o repositório:**

2. **Instale as dependências:**

```bash
npm install
```

3. **Inicie o servidor JSON (API mock):**

```bash
npx json-server --watch db.json --port 3001
```

O servidor json estará disponivel em `http://localhost:3001`

4. **Inicie o servidor Next.js:**

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000` ou na porta apresentada no terminal

---

## Estrutura de Pastas

```
src/
├── app/                # Páginas do Next.js
│   ├── About/          # Página de about
│   ├── Admin/          # Dashboard admin
│   ├── Elements/       # Página de listagem por categoria
│   ├── Login/          # Página de login
│   ├── Products/[name] # Página de detalhe do produto
│   ├── Register/       # Página de cadastro
│   ├── Shipping/       # Página de checkout
│   ├── Table/          # Página da Tabela Periódica (funcionalidade expecifica)
│   ├── components/     # Componentes relacionados a pagina inicial
│   └── page.tsx        # Página inicial
│
├── components/         # Componentes reutilizáveis para as paginas gerais
│   ├── CartItemCard.tsx      
│   ├── Header.tsx
│   ├── Element.tsx
│   ├── Modal.tsx
│   ├── Footer.tsx
│   └── CartModal.tsx
│
├── context/            # Contextos globais (Cart, Auth, Search)
│   ├── AuthContext.tsx
│   ├── CartContext.tsx
│   └── SearchContext.tsx
│
├── services/           # Funções de requisição de API
│   ├── adminServices.ts
│   ├── authServices.ts
│   └── elementsServices.ts
│
└── styles/             # Arquivos de estilo
    └── globals.css     # Tailwind variables e estilos globais
```

---

## Login de Administrador

Para acessar o painel admin, voce pode usar uma conta com `admin@admin` com senha `12345` ou qualquer outra conta disponivel diretamente no `db.json` ou via painel de admin.

---

## Observações

* Este projeto é **client-side only**, com `use client` na maioria dos arquivos.
* A autenticação é feita via `localStorage`, não possui backend real.

---
