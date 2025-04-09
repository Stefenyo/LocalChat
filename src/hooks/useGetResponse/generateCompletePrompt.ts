const combinePromptTemplates = (promptTemplates: string[]) => {
  return `
    ${promptTemplates.join("\n")}

  keep the chat history in mind when answering the question.
  The chat history is as follows:
  {chat_history}
  With this information in mind, respond to the following input:
  {question}
  `;
};

export { combinePromptTemplates };
