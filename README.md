# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Projeto React com Vite

Este projeto utiliza React com Vite para um desenvolvimento rápido e eficiente. Siga as instruções abaixo para configurar o ambiente de desenvolvimento.

## Pré-requisitos

- Git
- [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm)

## Instalação

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

### Passo 4: Instalar Dependências

Com a versão correta do Node.js ativa, instale as dependências do projeto:

```
npm install
```

### Passo 5: Rodar o Projeto

Inicie o servidor de desenvolvimento:

```
npm run dev
```
