'use client';

import { useState } from 'react';

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
    { role: 'assistant', content: data.result || 'Sem resposta.' }
  ]);
}   catch (err) {
    setMessages([
    ...updatedMessages,
    { role: 'assistant', content: 'Erro ao obter resposta da IA.' }
  ]);
    setError('Erro ao obter resposta da IA.');
}   finally {
    setLoading(false);
}
  };

  return (
  <main
    style={{
      padding: 20,
      maxWidth: 600,
      margin: '0 auto',
      background: '#343541', // fundo estilo ChatGPT
      minHeight: '70vh',
      marginTop: 100,
      borderRadius: 8,
    }}
  >
    <h1
      style={{
        fontSize: 28,
        marginBottom: 24,
        color: '#10a37f', // verde ChatGPT
        fontWeight: 700,
        textAlign: 'center',
      }}
    >
      ChatBot
    </h1>

    <div
      style={{
        border: '1px solid #4b5563',
        padding: 16,
        borderRadius: 16,
        minHeight: 240,
        backgroundColor: '#444654',
        marginBottom: 24,
      }}
    >
      {messages.map((msg, idx) => (
        <div
          key={idx}
          style={{
            marginBottom: 12,
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '10px 16px',
              borderRadius: 12,
              background: msg.role === 'user' ? '#10a37f' : '#3e3f4b',
              color: '#fff',
              maxWidth: '80%',
              fontWeight: 500,
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
              wordBreak: 'break-word',
            }}
          >
            {msg.content}
          </span>
        </div>
      ))}
      {loading && <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>Carregando...</p>}
      {error && <p style={{ color: '#f87171' }}>{error}</p>}
    </div>

    <form
  onSubmit={handleSubmit}
  style={{
    display: 'flex',
    gap: 10,
    alignItems: 'center',
  }}
>
  <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Digite sua mensagem..."
    style={{
      flex: 1,
      padding: '16px 18px', // padding aumentado
      background: '#202123',
      border: '1px solid #4b5563',
      borderRadius: 8,
      outline: 'none',
      fontSize: 16,
      color: '#f3f4f6',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      minHeight: 70, // altura mínima maior
    }}
  />
  <button
    type="submit"
    style={{
      backgroundColor: input.trim() ? '#10a37f' : '#4b5563',
      color: '#fff',
      padding: '24px 22px', // altura do botão ajustada para acompanhar o input
      border: 'none',
      borderRadius: 8,
      cursor: input.trim() ? 'pointer' : 'not-allowed',
      fontWeight: 'bold',
      fontSize: 16,
      transition: 'background 0.2s',
    }}
    disabled={loading || !input.trim()}
    onMouseOver={(e) => {
      if (input.trim()) e.currentTarget.style.backgroundColor = '#0e8f6d';
    }}
    onMouseOut={(e) => {
      if (input.trim()) e.currentTarget.style.backgroundColor = '#10a37f';
    }}
  >
        Enviar
      </button>
    </form>
  </main>
);

}
