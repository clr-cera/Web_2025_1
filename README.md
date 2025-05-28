# Report

## Integrantes do Grupo

Nome - Número USP

Clara Ernesto de Carvalho - 14559479

Gabriel Barbosa dos Santos - 14613991

Renan Parpinelli Scarpin - 14712188

## Requisitos

Ao final do desenvolvimento, devemos ter concluído uma aplicação web de página única com todas as funcionalidades necessárias para uma loja simples. Como um cadastro de usuário capaz de visualizar e comprar produtos e um cadastro de administrador capaz de adicionar novos produtos e alterar detalhes em produtos existentes. Como nossa loja vende elementos químicos, uma funcionalidade específica diferente de outras lojas é uma página que organiza os produtos em uma tabela periódica interativa que você pode clicar em um elemento para ir até a página de comprar aquele elemento.

## Descrição
Estamos desenvolvendo uma loja de elementos químicos da tabela periódica em forma pura, para que profissionais possam produzir quaisquer substâncias com esses elementos em suas casas.
Abaixo temos mockups feitos no Figma de todas as páginas.

A página principal (home page), abaixo versão desktop e mobile. HTML presente em /pages/index.html

![image](https://github.com/user-attachments/assets/f5300b8f-976d-4bc1-b90c-3b22ed535be7)

<img src="https://github.com/user-attachments/assets/f68fb2b1-08a5-493b-8675-5adca288cadb" alt="Mobile Home Page" style="height:800px;">

A página about com informações sobre a empresa:

![image](https://github.com/user-attachments/assets/73b150d9-4a03-4a48-838e-571483fd9aa0)


A página para navegar pelos diferentes produtos:

![image](https://github.com/user-attachments/assets/680cf599-f3f4-4b4b-9656-306700ac54c9)


Página com detalhes de um único produto, HTML presente em /pages/product.html. Imagem abaixo:

![image](https://github.com/user-attachments/assets/aa9fa265-79d7-46b8-8941-b4e78e8b4c21)


Modal do carrinho:

![image](https://github.com/user-attachments/assets/466eb6f7-0dd9-4a8f-9a74-a1c759315d9e)


Página do carrinho/checkout:

![image](https://github.com/user-attachments/assets/bf63c4b9-65a0-477c-894a-e4d0d67d68a9)


Página de LogIn com HTML presente em /pages/auth.html. Imagem abaixo:

![image](https://github.com/user-attachments/assets/21dd721f-89fe-4ec8-a6e6-2d258a090f69)


Dashboard do admin:

![image](https://github.com/user-attachments/assets/f97a9a41-588e-4756-8434-61dcb06bed44)


Modal para um admin adicionar outros admins:

![image](https://github.com/user-attachments/assets/e9c1ac5b-f056-4e1f-98df-0af903af69b6)


A funcionalidade que diferencia nossa loja das demais é uma tabela periódica onde todos os elementos a venda são expostos organizados na forma canônica e clicando em qualquer um dos elementos você é levado a página de comprar aquele produto:

![image](https://github.com/user-attachments/assets/58343347-2caf-4525-95ad-3936d9e2d721)

Diagrama de navegação entre as páginas:

![image](https://github.com/user-attachments/assets/33f67354-5332-42d2-a6f0-0172c580813a)


## Comentários do Código
Para o desenvolvimento, utilizamos o framework Next que trabalha sobre o React. A maior parte dos comentários sobre o código estão dentro do código em si. A seguir, temos uma árvore de todos os arquivos do código (dentro da página src), comentando a funcionalidade do arquivo.
```
├── app                             # Páginas do Next.js
│   ├── About/                      # Página de about
│   ├── Admin                       # Página de admin
│   │   ├── components              # Componentes usados na página de admin
│   │   │   ├── AdminTable.tsx      # Componente da tabela de admins
│   │   │   └── ProductTable.tsx    # Componente da tabela de produtos
│   │   └── page.tsx                # Página de admin em si
│   ├── components                  # Componentes relacionados a página inicial
│   │   ├── Banner.tsx              # Componente do Banner
│   │   ├── CategorySelector.tsx    # Componente do seletor de categorias
│   │   └── FeatureElements.tsx     # Componente que exibe os elementos químicos disponíveis
│   ├── Elements/                   # Página que exibe os elementos
│   ├── layout.tsx                  # Define o layout de todas as páginas
│   ├── Login/                      # Página de login
│   ├── page.tsx                    # Página inicial
│   ├── Products/[name]             # Página especifica dos produtos
│   ├── Register/                   # Página de registro
│   ├── Shipping/                   # Página de compra/pagamento
│   └── Table                       # Página da tabela periódica
│       ├── components              # Componentes da tabela periódica
│       │   └── ElementBlock.tsx    # Componente que define os blocos de elemento
│       └── page.tsx                # Página em si
├── assets/                         # Assets utilizados
├── components                      # Componentes globais
│   ├── CartItemCard.tsx            # Componente de um item no carrinho
│   ├── CartModal.tsx               # Componente do modal do carrinho
│   ├── Element.tsx                 # Componente do elemento
│   ├── Footer.tsx                  # Componente do footer
│   ├── Header.tsx                  # Componente do footer
│   └── Modal.tsx                   # Componente do modal
├── context                         # Contextos globais
│   ├── AuthContext.tsx             # Contexto de autenticação
│   ├── CartContext.tsx             # Contexto do carrinho
│   └── SearchContext.tsx           # Contexto de busca
├── services                        # Funções de requisições da API
│   ├── adminServices.ts            # Requisições relacionadas ao admin
│   ├── authServices.ts             # Requisições relacionadas a autenticação
│   ├── elementsServices.ts         # Requisições relacionadas ao elementos
│   └── purchaseService.ts          # Requisições relacionadas a compra
└── styles/                         # css global
```

## Plano de Teste
Como rodar o projeto para testar:

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

**Login de Administrador**

Para acessar o painel admin, voce pode usar uma conta com `admin@admin` com senha `12345` ou qualquer outra conta disponivel diretamente no `db.json` ou via painel de admin.

## Resultados dos testes
Rodando o site, navegando e realizando atividades dentro da interface, encontramos alguns problemas com o frontend que foram solucionados antes da data limite da milestone 2.

## Problemas
###Milestone 1
Percebemos que a Barra de navegação é uma ótima ferramenta para adicionar a possibilidade de troca rápida entre páginas distintas do website, entretanto essa alta taxa de conecção entre as taxas dificultou a produção de um diagrama de navegação, pois tradicionalmente cada nó é uma página e as arestas é o link entre elas. Isso foi resolvido tornando a NavBar (Barra de navegação) um nó no diagrama de navegação, o que foge da regra de apenas páginas serem nós, mas facilita a produção do diagrama e a compreensão de quem o visualiza.

###Milestone 2
Sem um back-end, seria muito inconveniente criar uma estrutura para adicionar nossas próprias imagens para representar os elementos. Portanto optamos pelo administrador associar o link de uma imagem na web a um elemento para que essa imagem represente o elemento, sem a possibilidade de fazer o upload de suas próprias imagens.

## Comentários
###Milestone 1
O Mockup das páginas foi produzido na ferramenta Figma.

###Milestone 2
Parte da validação dos dados foi deixada para a Milestone 3, essa escolha foi estratégica porque no Milestone 3 implementaremos o banco de dados em si e a forma como os dados são salvos no banco podem ajudar na validação. Por exemplo, atualmente o e-mail dos usuários tem diferenciação entre letras maiúsculas e minúsculas, o que não é o comportamento correto para a armazenagem de e-mails. Porém isso será resolvido automaticamente quando implementarmos o banco de dados, tornando desnecessário criar uma solução no momento.
