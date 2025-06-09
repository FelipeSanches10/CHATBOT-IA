# 🤖 Chatbot IA com OpenRouter API

Este é um projeto de chatbot construído com **Next.js 15**, **React 19** e **Tailwind CSS 4**, que utiliza a API do [OpenRouter](https://openrouter.ai/) para interagir com modelos de linguagem via IA.

## ⚙️ Decisões Técnicas

- **Next.js 15 + React 19**: Utilizados para aproveitar os recursos mais recentes de renderização e interatividade do React.
- **Tailwind CSS 4**: Escolhido para uma estilização rápida e responsiva baseada em utilitários.
- **Shadcn UI**: Adotado para componentes acessíveis e estilizados de forma consistente, acelerando o desenvolvimento da interface.
  - `app/api/chat/route.ts`: Rota para comunicação com a API da IA.
  - `components/ui`: Componentes com estilização UI (botão, input, etc).
  - `lib/utils.ts`: Funções auxiliares.
- **Estilo global próprio**: Estilização base definida em `globals.css` para maior controle visual.
- **Deploy via Vercel**: Plataforma escolhida por integração nativa com Next.js.


## 🧪 Como rodar localmente

### 📂 1. Clone do repositório

```bash
git clone https://github.com/FelipeSanches10/CHATBOT-IA.git
cd CHATBOT-IA

## Instaladores de dependências:
npm install

````

🔑 3. Gere a chave da API (OpenRouter)
Acesse: https://openrouter.ai/

Clique em Sign In ou Sign Up (caso não tenha conta).

Vá em https://openrouter.ai/keys e gere sua API Key.

Copie a chave gerada (começa com sk-or-...).


### 🚀 Link do Deploy:

[(https://chatbot-ia-pi.vercel.app/)](https://chatbot-n11pltmd1-felipesanches10s-projects.vercel.app/)


👤 Autor
Desenvolvido por Felipe Sanches.
