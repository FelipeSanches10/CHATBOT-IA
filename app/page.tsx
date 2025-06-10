import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <div className="max-w-xl w-full text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold !text-white">
          Bem-vindo ao IDe.ia
        </h1>
        <p className="text-lg md:text-xl text-white">
          <Link
            href="/chat"
            className="inline-block px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 text-white font-semibold tracking-wide shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 no-underline hover:text-white"
          >
            Ir para o Chat
          </Link>
        </p>
      </div>
    </main>
  );
}