## Pré-requisitos

- Git
- [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm)
- [PostegreSQL] (https://www.postgresql.org/download/)

## Link para o Video de Instalação das Ferramentas e Execução do Sistema
https://drive.google.com/file/d/17aDbBItIseMNCzrvDxiy3Omo_z2OPbB2/view?usp=sharing

### Passo 1: Clonar o Repositório

Clone o repositório para a sua máquina local usando o comando:

```
sh git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_REPOSITORIO>
```

### Passo 2: Instalar o NVM

Se você ainda não tem o NVM instalado, siga as instruções abaixo:

No Windows
Baixe e instale o NVM para Windows a partir do repositório oficial.

No macOS/Linux
Execute o seguinte comando no terminal:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Depois de instalar, reinicie o terminal e verifique a instalação com:

```
nvm --version
```

### Passo 3: Instalar a Versão Mais Recente do Node.js

Use o NVM para instalar a versão mais recente do Node.js:

```
nvm install node
nvm use node
```

## Instalação Backend

### Passo 4: Instale o PostgreSQL

Siga as instruções de download no link a cima.

### Passo 5: Criação do BD

Execute o pgAdimin (arquivo instalado pelo PostgreSQL).
Ao criar o usuário no PostgreSQL deixe o nome de usuário como postgre e defina a senha como admin.
Caso você já tenha baixado altere o arquivo database.js o nome e senha a serem utilizadas.
Dentro do aplicativo crie um novo Database com o nome "Certificadora3" e deixe o aplicativo aberto.

### Passo 6: Instalação das dependências

Abra um terminal na pasta backend do projeto e digite o comando:

```
npm install
```

### Passo 7: Execute o Backend

Ainda no terminal na pasta backend digite o comando:

```
npm start
```

Ao executar esse comando as tabelas e usuários básicos serão definidos automaticamente.

## Instalação Front

### Passo 8: Instalar Dependências

Com a versão correta do Node.js ativa abre um terminal na pasta raiz do projeto, instale as dependências do projeto, o package.json garantira que a versão correta sera instalada:

```
npm install
```

### Passo 9: Rodar o Projeto

Inicie o servidor de desenvolvimento:

```
npm run dev
```
