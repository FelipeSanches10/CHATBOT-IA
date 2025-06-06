'use client';

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    const updatedMessages = [...messages, newMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await response.json();
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: data.result || "Sem resposta." },
      ]);
    } catch {
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "Erro ao obter resposta da IA." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-background px-2">
      <Card className="w-full max-w-xl flex flex-col h-[70vh] shadow-lg border">
        <CardHeader>
          <h1 className="text-2xl font-bold text-primary">Chatbot IA</h1>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-3 px-2 py-4 bg-muted rounded-lg">
          {messages.length === 0 && (
            <div className="text-muted-foreground text-center mt-10">
              Envie uma mensagem para começar a conversa!
            </div>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[80%] px-4 py-2 rounded-xl shadow-sm break-words ${
                msg.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "mr-auto bg-white text-foreground border"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="mr-auto text-muted-foreground italic">Carregando...</div>
          )}
        </CardContent>
        <CardFooter className="border-t bg-card p-4">
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1"
              disabled={loading}
            />
            <Button type="submit" disabled={loading || !input.trim()}>
              Enviar
            </Button>
          </form>
        </CardFooter>
      </Card>
    </main>
  );
}