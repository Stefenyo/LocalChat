import { useState } from "react";

const LOCALSTORAGE_KEY = "LC_basePrompt";

const initializeBasePrompt = () => {
  const storedBasePrompt = localStorage.getItem(LOCALSTORAGE_KEY);

  return storedBasePrompt ? storedBasePrompt : ``;
};

const useBasePrompt = () => {
  const [basePrompt, setBasePrompt] = useState<string>(initializeBasePrompt);

  const updateBasePrompt = (newBasePrompt: string) => {
    setBasePrompt(newBasePrompt);
    localStorage.setItem(LOCALSTORAGE_KEY, newBasePrompt);
  };

  return {
    basePrompt,
    updateBasePrompt,
  };
};

export { useBasePrompt };
