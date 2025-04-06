import { BASE_PROMPT_TEMPLATE, TITLES_PROMPT_TEMPLATE } from "./templates";

const generateCompletePrompt = (contentType: string) => {
  console.log("contentType", contentType);

  return `${BASE_PROMPT_TEMPLATE}
  
  ${TITLES_PROMPT_TEMPLATE}
  
  With this information in mind, respond to the following input:
  {question}`;
};

export { generateCompletePrompt };
