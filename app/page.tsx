import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Bem-vindo ao Chatbot de IA</h1>
      <p>
        Acesse o <Link href="/chat">Chat</Link>
      </p>
    </main>
  );
}