import { useState } from "react";

const LOCALSTORAGE_KEY = "LC_basePrompt";

const initializeBasePrompt = () => {
  const storedBasePrompt = localStorage.getItem(LOCALSTORAGE_KEY);

  return storedBasePrompt
    ? storedBasePrompt
    : `You are a helpful assistant. You will be given a question and you will answer it in detail.`;
};

const useBasePrompt = () => {
  const [basePrompt, setBasePrompt] = useState<string>(initializeBasePrompt);

  const updateBasePrompt = (newBasePrompt: string) => {
    setBasePrompt(newBasePrompt);
  };

  const saveBasePrompt = (newBasePrompt: string) => {
    localStorage.setItem(LOCALSTORAGE_KEY, newBasePrompt);
  };

  return {
    basePrompt,
    updateBasePrompt,
    saveBasePrompt,
  };
};

export { useBasePrompt };
