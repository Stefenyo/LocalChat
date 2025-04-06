import { ChatOllama } from "@langchain/ollama";

const BASE_URL = "http://localhost:11434";

const chat = new ChatOllama({
  baseUrl: BASE_URL,
  model: "llama3.2",
});

const ollama = {
  chat,
};

export { ollama };
