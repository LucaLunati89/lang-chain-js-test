import {
  SimplePromptInputTranslator,
  simplePromptInputTranslator,
  promptTemplateTranslator,
} from "../utils";
import { ChatPromptValueInterface } from "@langchain/core/prompt_values";

const invokePrompt = async (
  promptInput: SimplePromptInputTranslator
): Promise<ChatPromptValueInterface> => {
  const promptTemplate = promptTemplateTranslator;
  return await promptTemplate.invoke(promptInput);
};

invokePrompt(simplePromptInputTranslator)
  .then((result) => console.log("result: ", result))
  .catch((error) => console.log("error: ", error));
