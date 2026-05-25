# Solistic

A Solistic é uma aplicação web moderna voltada para o desenvolvimento e gerenciamento de soluções e sistemas sob medida. Desenvolvido com foco em alta performance, design minimalista e transições fluidas, o projeto utiliza o ecossistema React.

---

## Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias e bibliotecas:

- React 19 e TypeScript
- Vite
- Tailwind CSS v4 e @tailwindcss/vite
- Framer Motion
- React Router Dom
- shadcn/ui
- React Hook Form e Zod
- Axios

---

## Estrutura do Projeto

O projeto adota uma arquitetura modular focada em separação de conceitos. A estrutura principal do diretório src está organizada da seguinte forma:

```
src/
├── assets/ # Mídias estáticas e imagens do projeto
├── components/
│ ├── creative/ # Componentes exclusivos de interface e blocos visuais
│ └── ui/ # Componentes de base do shadcn/ui
├── lib/ # Configurações globais, instâncias de API e utilitários
├── pages/ # Páginas e fluxos principais de rotas da aplicação
├── App.tsx # Home principal da aplicação (Landing Page)
└── main.tsx # Ponto de entrada do React e inicialização do sistema
```

---

## Como Fazer o Setup (Instalação Local)

Siga os passos abaixo para clonar o repositório e rodar o projeto localmente:

### 1. Clonar o Repositório

```bash
git clone https://github.com/crucialclock/solistic
cd solistic
```

### 2. Instalar as Dependências

Instale todos os pacotes necessários listados no package.json:

```bash
npm install
```

### 3. Executar em Modo de Desenvolvimento

Inicie o servidor local do Vite:

```bash
npm run dev
```

### 4. Outros Comandos Úteis

- Verificação de tipos: npm run typecheck
- Formatador de Código: npm run format
- Linter: npm run lint

---

## Como Funciona o Deploy no GitHub Pages

O deploy deste projeto está totalmente automatizado diretamente para as páginas estáticas do GitHub.

### A Biblioteca gh-pages

Para facilitar esse processo, o projeto utiliza a biblioteca gh-pages como dependência de desenvolvimento. O papel dela é criar de forma automatizada um branch isolado no seu repositório chamado gh-pages, compilar o código de produção do Vite e fazer o upload apenas dos arquivos otimizados (HTML, JS, CSS prontos) para lá.

### Comando de Deploy

Para gerar o build de produção atualizado e subir diretamente para o seu link do GitHub Pages, execute o seguinte comando no terminal:

```bash
npm run deploy
```

O que este comando faz por baixo dos panos:

1. Executa o tsc -b para garantir que não há erros de tipagem no TypeScript.
2. Executa o vite build para compilar e minificar todo o código dentro da pasta dist.
3. Executa o gh-pages -d dist para pegar o conteúdo gerado dentro da pasta dist e publicar direto no branch de hospedagem do seu GitHub.

---

## Adicionando Novos Componentes (shadcn/ui)

Este projeto utiliza o modelo de componentes sob demanda do shadcn/ui. Se precisar de um novo elemento de interface, você pode injetá-lo diretamente usando o CLI:

```bash
npx shadcn@latest add <nome-do-componente>
```
