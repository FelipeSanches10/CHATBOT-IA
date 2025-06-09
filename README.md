# 🤖 Chatbot IA com OpenRouter API

Este é um projeto de chatbot construído com **Next.js 15**, **React 19** e **Tailwind CSS 4**, que utiliza a API do [OpenRouter](https://openrouter.ai/) para interagir com modelos de linguagem via IA.

## ⚙️ Decisões Técnicas

- **Next.js 15 + React 19**: Utilizado para aproveitar recursos de renderização moderna e as novas APIs do React.
- **Tailwind CSS 4**: Usado para estilização rápida e responsiva com utilitários, sem dependências de UI libs como Shadcn UI.
- **Estrutura modular**: Separação clara entre:
  - `app/api/chat/route.ts`: Rota para comunicação com a API da IA.
  - `components/ui`: Biblioteca com ShadcnUI (botão, input, etc).
  - `lib/utils.ts`: Funções auxiliares.
- **Estilo global próprio**: Estilização base definida em `globals.css` para maior controle visual.
- **Deploy via Vercel**: Plataforma escolhida por integração nativa com Next.js.


## 🧪 Como rodar localmente

###  📂 Clone do repositório:

git clone https://github.com/FelipeSanches10/CHATBOT-IA.git


### 🔑 Chave de API:

OPENROUTER_API_KEY=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


### 🚀 Link do Deploy:

(https://chatbot-ia-pi.vercel.app/)
