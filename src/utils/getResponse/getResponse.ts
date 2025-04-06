import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { ollama } from "@/config/ollama";
import { generateCompletePrompt } from "./promptTemplates";

interface Props {
  question: string;
  history: string;
}

// Define SystemPrompt
const answerTemplate = generateCompletePrompt("titles");

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
