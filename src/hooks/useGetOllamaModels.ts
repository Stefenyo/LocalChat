// src/hooks/useGetOllamaModels.ts
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type OllamaModel = {
  name: string;
  modified_at: string;
  size: number;
};

type OllamaModelsResponse = {
  models: OllamaModel[];
};

const LOCALSTORAGE_KEY = "LC_selectedModel";

// Fetches the installed Ollama models from the local API using fetch.
const fetchOllamaModels = async (): Promise<string[]> => {
  const res = await fetch("http://localhost:11434/api/tags");

  if (!res.ok) {
    throw new Error(`Failed to fetch Ollama models: ${res.statusText}`);
  }

  const data: OllamaModelsResponse = await res.json();
  return data.models.map((model) => model.name);
};

const initializeSelectedModel = () => {
  const storedSelectedModel = localStorage.getItem(LOCALSTORAGE_KEY);

  return storedSelectedModel ? storedSelectedModel : ``;
};

const validateSelectedModel = (model: string, listOfModels: string[]) => {
  return listOfModels.includes(model);
};

export const useGetOllamaModels = () => {
  const [selectedModel, setSelectedModel] = useState<string>(
    initializeSelectedModel
  );

  const updateSelectedModel = (newModel: string) => {
    setSelectedModel(newModel);
    localStorage.setItem(LOCALSTORAGE_KEY, newModel);
  };

  const { data: modelList = [], isLoading } = useQuery({
    queryKey: ["ollama", "models"],
    queryFn: fetchOllamaModels,
  });

  return {
    selectedModel,
    updateSelectedModel,
    modelList,
    isLoading,
    validateSelectedModel,
  };
};
