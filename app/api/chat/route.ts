import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000", // Substitua pelo seu domínio se estiver em produção
        "X-Title": "Meu Chatbot com Llama 3",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct", // ou 'meta-llama/llama-3-70b-instruct'
        messages: [
          {
            role: "system",
            content: "Você é um assistente útil e amigável. Responda sempre em português brasileiro.",
          },
          ...messages,
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(error);
      return NextResponse.json({ error: "Erro na API OpenRouter" }, { status: 500 });
    }

    const data = await response.json();
    const result = data.choices[0]?.message?.content ?? "Sem resposta";

    return NextResponse.json({ result });
  } catch (e) {
    console.error("Erro:", e);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
