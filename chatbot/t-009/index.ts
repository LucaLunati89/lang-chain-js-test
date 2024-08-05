import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { ChatOpenAI } from "@langchain/openai";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { LLM, llm, messageHistories, sessionId } from "../../utils";
import { chatHistory, inputKey, filterMessages, prompt } from "../utils";

const invokeWithMessageHistorySliced = async (
  chat: LLM,
  input: string,
  sessiondId: string
) => {
  const chatOpenAI = new ChatOpenAI(chat);

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

  return await withMessageHistory.stream(
    {
      input: input,
    },
    chatConfig
  );
};

const q1 = "What's my name?";
const q2 = "What's my favourite ice cream?";

invokeWithMessageHistorySliced(llm, q1, sessionId)
  .then(async (result) => {
    for await (const chunk of result) {
      console.log("|", chunk.content);
    }
  })
  .catch((error) => console.log("error: ", error));
