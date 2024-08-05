import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { ChatOpenAI } from "@langchain/openai";
import { LLM, llm, messageHistories } from "../../utils";
import { AIMessage } from "@langchain/core/messages";
import { inputKey, chatHistory, prompt } from "../utils";
import { sessionId } from "../../utils";

const invokeWithMessageHistory = async (
  llm: LLM,
  input: string,
  sessionId: string,
  messageHistories: Record<string, InMemoryChatMessageHistory>
): Promise<AIMessage> => {
  const chatOpenAI = new ChatOpenAI(llm);
  const chain = prompt.pipe(chatOpenAI);

  const withMessageHistory = new RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory: async (sessionId) => {
      if (messageHistories[sessionId] === undefined) {
        messageHistories[sessionId] = new InMemoryChatMessageHistory();
      }
      return messageHistories[sessionId];
    },
    inputMessagesKey: inputKey,
    historyMessagesKey: chatHistory,
  });

  const chatConfig = {
    configurable: {
      sessionId: sessionId,
    },
  };

  return await withMessageHistory.invoke(
    {
      [inputKey]: input,
    },
    chatConfig
  );
};

invokeWithMessageHistory(llm, "Hi what's my name?", sessionId, messageHistories)
  .then((result) => console.log("result: ", result))
  .catch((error) => console.log("error: ", error));
