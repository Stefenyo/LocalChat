import { useState } from "react";

interface SubPrompt {
  title: string;
  prompt: string;
}

const LOCALSTORAGE_KEY = "LC_subPrompts";

const initializeSubPrompts = () => {
  const storedSubPrompts = localStorage.getItem(LOCALSTORAGE_KEY);

  return storedSubPrompts ? JSON.parse(storedSubPrompts) : [];
};

const useSubPrompts = () => {
  const [subPrompts, setSubPrompts] =
    useState<SubPrompt[]>(initializeSubPrompts);

  //   const updateBasePrompt = (newBasePrompt: string) => {
  //     setBasePrompt(newBasePrompt);
  //   };

  //   const saveSubPrompts = (newBasePrompt: string) => {
  //     localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(subPrompts));
  //   };

  const addSubPrompt = (newSubPrompt: SubPrompt) => {
    const updatedSubPrompts = [...subPrompts, newSubPrompt];
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(updatedSubPrompts));
    setSubPrompts(updatedSubPrompts);
  };

  const removeSubPrompt = (index: number) => {
    const updatedSubPrompts = subPrompts.filter((_, i) => i !== index);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(updatedSubPrompts));
    setSubPrompts(updatedSubPrompts);
  };

  const updateSubPrompt = (index: number, updatedSubPrompt: SubPrompt) => {
    const updatedSubPrompts = subPrompts.map((subPrompt, i) =>
      i === index ? updatedSubPrompt : subPrompt
    );
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(updatedSubPrompts));
    setSubPrompts(updatedSubPrompts);
  };

  // right a functon to check if the subPrompt already exists by title
  const hasExistingSubPromptTitle = (title: string) => {
    return subPrompts.some((subPrompt) => subPrompt.title === title);
  };

  return {
    subPrompts,
    addSubPrompt,
    removeSubPrompt,
    updateSubPrompt,
    hasExistingSubPromptTitle,
  };
};

export { useSubPrompts };
export type { SubPrompt };
