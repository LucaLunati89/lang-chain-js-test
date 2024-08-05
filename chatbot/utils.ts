import { ChatPromptTemplate } from "@langchain/core/prompts";
import type { BaseMessage } from "@langchain/core/messages";

export const inputKey = "input";
export const chatHistory = "chat_history";

export const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a helpful assistant who remembers all details the user shares with you.`,
  ],
  ["placeholder", `{${chatHistory}}`],
  ["human", `{${inputKey}}`],
]);

export const filterMessages = ({
  chat_history,
}: {
  chat_history: BaseMessage[];
}) => {
  return chat_history.slice(-10);
};
