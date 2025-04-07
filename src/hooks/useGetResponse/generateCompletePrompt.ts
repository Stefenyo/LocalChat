const combinePromptTemplates = (promptTemplates: string[]) => {
  return `
    ${promptTemplates.join("\n")}

  With this information in mind, respond to the following input:
  {question}
  `;
};

export { combinePromptTemplates };
