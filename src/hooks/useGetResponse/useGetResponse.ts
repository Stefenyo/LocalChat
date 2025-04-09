import { useCallback } from "react";
import { useBasePrompt } from "../useBasePrompt";
import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { combinePromptTemplates } from "./generateCompletePrompt";

interface Props {
  selectedModel: string;
}

export const useGetResponse = ({ selectedModel }: Props) => {
  const { basePrompt } = useBasePrompt();

  const getResponse = useCallback(
    async ({ question, history }: { question: string; history: string }) => {
      if (!selectedModel) {
        throw new Error("Missing selected model");
      }

      const model = new ChatOllama({
        model: selectedModel, // e.g., "llama3" or "mistral"
        temperature: 0.7,
      });

      // Define SystemPrompt
      const answerTemplate = combinePromptTemplates([basePrompt]);
      const answerPrompt = ChatPromptTemplate.fromTemplate(answerTemplate);

      const chain = RunnableSequence.from([
        {
          chat_history: (input) => input.chat_history,
          question: (input) => input.question,
        },
        {
          response: answerPrompt.pipe(model).pipe(new StringOutputParser()),
        },
      ]);

      return chain.stream({
        question,
        chat_history: history,
      });
    },
    [basePrompt, selectedModel]
  );

  return getResponse;
};
