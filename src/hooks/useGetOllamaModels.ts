// src/hooks/useGetOllamaModels.ts
import { useQuery } from "@tanstack/react-query";

type OllamaModel = {
  name: string;
  modified_at: string;
  size: number;
};

type OllamaModelsResponse = {
  models: OllamaModel[];
};

/**
 * Fetches the installed Ollama models from the local API using fetch.
 */
const fetchOllamaModels = async (): Promise<string[]> => {
  const res = await fetch("http://localhost:11434/api/tags");

  if (!res.ok) {
    throw new Error(`Failed to fetch Ollama models: ${res.statusText}`);
  }

  const data: OllamaModelsResponse = await res.json();
  return data.models.map((model) => model.name);
};

/**
 * Custom hook to get the list of installed Ollama model names.
 */
export const useGetOllamaModels = () => {
  const { data: modelList = [], isLoading } = useQuery({
    queryKey: ["ollama", "models"],
    queryFn: fetchOllamaModels,
  });

  return { modelList, isLoading };
};
