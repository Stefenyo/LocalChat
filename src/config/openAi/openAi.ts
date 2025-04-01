import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';

const OPEN_AI_API_KEY = import.meta.env.VITE_OPEN_AI_API_KEY as string;

if (!OPEN_AI_API_KEY) throw new Error('Missing OpenAI API key name in .env file');

const chat = new ChatOpenAI({
  openAIApiKey: OPEN_AI_API_KEY,
  temperature: 0,
});

const embeddings = new OpenAIEmbeddings({ openAIApiKey: OPEN_AI_API_KEY });

const openAi = {
  chat,
  embeddings,
};

export { openAi };
