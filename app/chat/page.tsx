'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Send, MessageSquare, Bot, User } from 'lucide-react';


export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, newMessage];

    setMessages(updatedMessages);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) throw new Error('Erro ao chamar a API da IA');

      const data = await response.json();
      setMessages([
        ...updatedMessages,
        { role: 'assistant', content: data.result || 'Sem resposta.' },
      ]);
    } catch (err) {
      setMessages([
        ...updatedMessages,
        { role: 'assistant', content: 'Erro ao obter resposta da IA.' },
      ]);
      setError('Erro ao obter resposta da IA.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 flex items-center justify-center">
      <Card className="w-full max-w-4xl h-[85vh] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-0 shadow-2xl">
        <CardHeader className="border-b bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur">
          <div className="flex items-center justify-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              IDe.ia
            </CardTitle>
            <Badge variant="secondary" className="ml-auto">
              Online
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex flex-col h-[calc(85vh-120px)]">
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 mb-4">
                    <Bot className="h-8 w-8 text-emerald-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Bem-vindo ao IDe.ia!
                  </h3>
                  <p className="text-muted-foreground">
                    Faça uma pergunta para começar nossa conversa
                  </p>
                </div>
              )}

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                        : 'bg-muted border shadow-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </p>
                  </div>

                  {msg.role === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-muted border shadow-sm rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />
                      <span className="text-sm text-muted-foreground">
                        Pensando...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex justify-center">
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-2">
                    <p className="text-sm text-destructive font-medium">{error}</p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="border-t bg-background/50 backdrop-blur p-6">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  disabled={loading}
                  className="pr-12 h-12 text-base bg-background border-2 focus:border-emerald-500 transition-colors"
                />
              </div>
              <Button
                type="submit"
                disabled={loading || !input.trim()}
                size="lg"
                className="h-12 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}