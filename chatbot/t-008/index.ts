import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { ChatOpenAI } from "@langchain/openai";
import type { BaseMessage } from "@langchain/core/messages";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { prompt } from "../utils";
import { chatHistory, inputKey } from "../utils";
import { LLM, llm, messageHistories, sessionId } from "../../utils";

const invokeWithMessageHistorySliced = (
  chat: LLM,
  input: string,
  sessiondId: string,
  messageHistories: Record<string, InMemoryChatMessageHistory>
) => {
  const chatOpenAI = new ChatOpenAI(chat);

  const filterMessages = ({
    chat_history,
  }: {
    chat_history: BaseMessage[];
  }) => {
    return chat_history.slice(-10);
  };

  const chain = RunnableSequence.from([
    new RunnablePassthrough().assign({
      chat_history: filterMessages,
    }),
    prompt,
    chatOpenAI,
  ]);

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
      sessionId: sessiondId,
    },
  };

  return withMessageHistory.invoke(
    {
      input: input,
    },
    chatConfig
  );
};

const q1 = "What's my name?";
const q2 = "What's my favourite ice cream?";

invokeWithMessageHistorySliced(llm, q1, sessionId, messageHistories)
  .then((result) => console.log("result: ", result))
  .catch((error) => console.log("error: ", error));
