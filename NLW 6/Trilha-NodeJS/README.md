<h1 align="center">Valoriza</h1>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=8257E5&labelColor=000000">

  <img src="https://img.shields.io/static/v1?label=NLW&message=Together&color=8257E5&labelColor=000000" alt="NLW Together" />
</p>

<p align="center">
  <img alt="Preview" src="./.github/preview.png">
</p>

## ✨ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [JSONWebToken](https://github.com/auth0/node-jsonwebtoken#readme)
- [Docker](https://www.docker.com/)

## 💻 Projeto

Valoriza é uma plataforma para promover o reconhecimento entre companheiros de equipe.

## 🚀 Como executar

- Clone o repositório
- Preencha o arquivo `.env.example` com os dados que deseja, depois o renomeie para `.env`
- Preencha o arquivo `ormconfig.example.json` com os dados que deseja, depois o renomeie para `ormconfig.json`
- Rode `yarn` para baixar as dependências
- Rode `docker-compose up --build -V` para fazer o docker rodar todos os apps e banco de dados Postgres
- Dentro do container do app, rode `yarn typeorm migration:run` para criar as tabelas do banco de dados.

Por fim, a aplicação estará disponível em `http://localhost:3000`

---

Feito com 💜 &nbsp;by Rocketseat 👋🏻 &nbsp;[Participe da comunidade!](https://discord.gg/gKUVrzrPrU)
