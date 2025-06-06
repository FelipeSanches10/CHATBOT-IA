import { ChatMessage } from '@/types/message';

export const sendMessageToHuggingFace = async (messages: ChatMessage[]) => {
  const response = await fetch("https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
    },
    body: JSON.stringify({
      inputs: messages.map(m => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`).join("\n") + "\nAssistant:",
      parameters: {
        max_new_tokens: 200,
        temperature: 0.7,
        return_full_text: false
      }
    }),
  });

  if (!response.ok) throw new Error("Erro na Hugging Face");

  const data = await response.json();
  return data[0]?.generated_text?.split("Assistant:")?.[1]?.trim() ?? "Erro ao gerar resposta.";
};
