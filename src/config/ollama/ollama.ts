import { ChatOllama } from '@langchain/community/chat_models/ollama';

const BASE_URL = 'http://localhost:11434';

const chat = new ChatOllama({
  baseUrl: BASE_URL,
  model: "NOMO-v16",
});

const ollama = {
  chat,
};

export { ollama };
