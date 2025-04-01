import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { ollama } from "@/config/ollama";

interface Props {
  question: string;
  history: string;
}

// Define SystemPrompt
const answerTemplate = `You are an AI language model trained on Audi's official tone of voice and writing style. Your role is to generate compelling, premium, and sophisticated content aligned with Audi’s brand identity.

{question}
`;

const answerPrompt = ChatPromptTemplate.fromTemplate(answerTemplate);

const chain = RunnableSequence.from([
  {
    chat_history: (input) => input.chat_history,
    question: (input) => input.question,
  },
  {
    response: answerPrompt.pipe(ollama.chat).pipe(new StringOutputParser()),
  },
]);

// Function to get response
const getResponse = async ({ question, history }: Props) =>
  chain.stream({ question, chat_history: history });

export { getResponse };
