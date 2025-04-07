import { useState } from "react";

const LOCALSTORAGE_KEY = "LC_selectedModel";

const initializeSelectedModel = () => {
  const storedSelectedModel = localStorage.getItem(LOCALSTORAGE_KEY);

  return storedSelectedModel ? storedSelectedModel : ``;
};

const useSelectedModel = () => {
  const [selectedModel, setSelectedModel] = useState<string>(
    initializeSelectedModel
  );

  const updateSelectedModel = (newModel: string) => {
    setSelectedModel(newModel);
    localStorage.setItem(LOCALSTORAGE_KEY, newModel);
  };

  const validateSelectedModel = (model: string, listOfModels: string[]) => {
    return listOfModels.includes(model);
  };

  return {
    selectedModel,
    updateSelectedModel,
    validateSelectedModel,
  };
};

export { useSelectedModel };
