import { ChatPromptTemplate } from "@langchain/core/prompts";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export const text = "text";
export const language = "language";

export type SimplePromptInputTranslator = {
  text: string;
  language: string;
};

export const simplePromptInputTranslator: SimplePromptInputTranslator = {
  text: "Hi",
  language: "Italian",
};

export const promptTemplateTranslator = ChatPromptTemplate.fromMessages([
  ["system", `Translate the following into {${language}}:`],
  ["user", `{${text}}`],
]);

const systemMessage = "Translate the following from English into Italian";
const humanMessage = "Hello";

export const messages = [
  new SystemMessage(systemMessage),
  new HumanMessage(humanMessage),
];
