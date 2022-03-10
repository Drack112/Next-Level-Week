<h1 style="text-align:center">Ecoleta Backend</h1>
<br>
<div align="center">
    <img src="https://img.shields.io/badge/Server-nodejs-success">
    <img src="https://img.shields.io/badge/%3C%3E-typescript-blueviolet">
    <img src="https://img.shields.io/badge/Database-Postgres-blue">
</div>
<br>

<div align="center">
    <a href="#sobre">Sobre</a> | <a href="#tecnologias">Tecnologias</a> | <a href="#run">Rodando o projeto</a>
</div>

<a id="sobre"></a>

## :recycle: Sobre Projeto Ecoleta

O projeto **Ecoleta** visa ajudar pessoas que tenham o interesse de descartar resíduos que possam agredir o meio ambiente em locais adequados onde poderam ser reciclados e reaproveitados.

Com ele um estabelecimento pode efetuar um cadastro informando sua localidade e tipos de itens que ele reclica como lâmpadas, óleo de cozinhas, papelão, etc.

Com o aplicativo mobile qualquer pessoa pode buscar por estabelecimentos próximos que faça a coleta dos itens reciclaveis que deseja descartar.
Com isso você ajuda a preservar o nosso planeta reciclando. 🥰

<a id="tecnologias"></a>

## :computer: Tecnologias

O backend da aplicação foi desenvolvido utilizando as tecnologias:

- [Node.JS](https://nodejs.org/en/docs/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Postgres](https://www.postgresql.org)
- [Knex](http://knexjs.org/)
- [Multer](https://www.npmjs.com/package/multer)
- [Cors](https://github.com/expressjs/cors)
- [Docker](https://www.docker.com)

<a id="run"></a>

## :running: Rodando o projeto

### DEV Containers🤯

A aplicação tem suporte para **[DevContainers](https://code.visualstudio.com/docs/remote/containers)**, para rodar basta ter o **[Docker](https://www.docker.com)** rodando na maquina e o VsCode para entrar no container de desenvolvimento.

### Rodando através da fonte.

#### 1. Pré-requisitos:

- **[Node.js](https://nodejs.org/en/)**, **[Git](https://git-scm.com/)**, um gerenciador de pacotes (**[NPM](https://www.npmjs.com/)** ou **[Yarn](https://yarnpkg.com/)**) e **_[Docker + Docker Compose](https://www.docker.com)_** instalados na máquina.

#### 2. Instalando dependencias

```bash
$ npm install
# ou
$ yarn install
```

#### 3. Criando o Banco de Dados Postgres

Preencha os dados do arquivo `.env.example` e depois renomeie ele para `.env`

```.env
# Dados Obrigatórios
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_HOST=

# Dados Opcionais
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=

```

Caso queira ter certeza que o arquivo `.env` está tendo os valores lidos pelo **NodeJS**, você pode rodar um arquivo de teste no terminal e ver o objeto com os valores preenchidos.

```bash
$ yarn test-env
```

Caso os valores foram retornados, você pode avançar para a criação do banco de dados:

```bash
$ docker-compose up db
```

```bash
$ yarn run knex:migrate
# ou
$ npm run knex:migrate

$ yarn run knex:seed
# ou
$ npm run knex:migrate
```

#### 4 Iniciando a Api

```bash
$ npm run dev
# ou
$ yarn run dev
```

Não esqueça de configurar devidamente seu ambiente e vamos lá ;)

\*Este conteúdo foi sendo desenvolvido com base nas aulas do modulo **Booster\***

#### _Sinta-se livre para colaborar, toda ajuda é bem vinda ;)_

<br/>
