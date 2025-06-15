<!-- markdownlint-disable MD013 -->

# **Backend**

O backend foi construído usando express.js e TypeScript. Ele serve como a API para a aplicação, lidando com requisições, gerenciando dados de usuários e produtos, e fornecendo os endpoints necessários para a interação com o frontend.

Para autenticação, o backend utiliza JWT (JSON Web Tokens) para gerenciar sessões de usuário de forma segura. Ele também inclui middleware para tratamento de erros e validação de requisições.

Todas as senhas são hasheadas usando pbkdf2 antes de serem armazenadas no banco de dados, garantindo que as credenciais dos usuários sejam mantidas seguras.

O banco de dados é gerenciado com MongoDB, utilizando Mongoose como a biblioteca ODM (Object Data Modeling) para facilitar as interações. Criamos um cluster no MongoDB Atlas para garantir que o professor e os monitores possam acessar o banco de dados de qualquer lugar. Se surgirem problemas, como a necessidade de liberar endereços de IP, por favor, entre em contato com a Clara (@clr_cera no Telegram), pois ela é a responsável pelo cluster do banco de dados.

---

## Tecnologias utilizadas

- [Express.js](https://expressjs.com/pt-br/) - Framework para Node.js, utilizado para criar o servidor, definir as rotas da API e gerenciar as requisições HTTP.

- [TypeScript](https://www.typescriptlang.org/) - Usado para adicionar tipagem estática ao JavaScript, o que ajuda a prevenir erros e a manter a consistência do código no backend.

- [Mongoose](https://mongoosejs.com/) - Biblioteca de Modelagem de Dados de Objeto (ODM) para o MongoDB. Facilita a interação com o banco de dados, permitindo a criação de `Schemas` para os dados.

- [MongoDB](https://www.mongodb.com/pt-br) - Banco de dados NoSQL orientado a documentos, utilizado para armazenar os dados dos usuários e dos produtos (elementos).

- [JWT (JSON Web Token)](https://jwt.io/) - Padrão utilizado para criar tokens de acesso que permitem a autenticação segura dos usuários, garantindo que apenas usuários autorizados possam acessar certas rotas.

- [Cors](https://expressjs.com/en/resources/middleware/cors.html) - Middleware que permite que o frontend faça requisições para o backend, mesmo estando em domínios diferentes.

- [Morgan](https://expressjs.com/en/resources/middleware/morgan.html) - Middleware utilizado para registrar (logar) as requisições HTTP que chegam no servidor, facilitando o desenvolvimento e a depuração.

---

## **Executando o Backend**

Se estiver usando npm

```bash
npm install
npm start
```

Se estiver usando bun

```bash
bun install
bun start_bun
```

Se ocorrer um erro após alguns segundos executando o backend, provavelmente é necessário liberar seu endereço de IP no cluster do MongoDB Atlas. Por favor, entre em contato com a equipe.

---

## **Arquitetura**

O backend é estruturado em vários componentes principais:

- **Controllers**: Lidam com a lógica de roteamento para cada requisição.
- **Services**: Usam os repositórios para orquestrar a lógica da aplicação.
- **Repositories**: Acessam todas as dependências externas, como o banco de dados, a biblioteca de hashing e a biblioteca JWT, e externaliza diversas funções para uso pelo Services.
- **Models**: Definem os schemas do banco de dados, neste caso o `users` e `elements`.

---

### **Estrutura de Arquivos**

```
backend/
├── app.ts \# Ponto de entrada da aplicação, configura o servidor e os middlewares
├── model/
│ └── db.ts \# Conexão com o banco de dados Mongoose e definições de Schema
├── package-lock.json \# Arquivo de lock para as dependências do npm
├── package.json \# Arquivo JSON para dependências e scripts
├── bun.lock \# Arquivo de lock para as dependências do bun
├── repository/
│ ├── elements.ts \# Operações de banco de dados para os elementos
│ ├── hash.ts \# Operações de hashing para as senhas
│ ├── jwt.ts \# Operações de token para JWT
│ └── users.ts \# Operações de banco de dados para os usuários
├── routes/
│ ├── elements.ts \# Manipuladores de requisição para os elementos
│ ├── middleware.ts \# Middleware para autenticação
│ ├── ping.ts \# Rota de ping para verificação de saúde do sistema
│ └── users.ts \# Manipuladores de requisição para os usuários
└── services/
 ├── elements.ts \# Orquestração da lógica para os elementos
 └── users.ts \# Orquestração da lógica para os usuários
```

---

## **Observações**

- O usuário administrador é criado automaticamente na primeira vez que o backend acessa a base de dados. As credenciais são:
  - Email: <admin@admin.com.br>
  - Senha: `admin`
