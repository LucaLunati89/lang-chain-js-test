import { ChatOpenAI } from "@langchain/openai";
import type { BaseMessage } from "@langchain/core/messages";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { LLM, llm, messages } from "../../utils";
import { prompt } from "../utils";

const invokeWithRunnableSequence = async (chat: LLM, input: string) => {
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

  return await chain.invoke({
    chat_history: messages,
    input: input,
  });
};

const q1 = "What's my name?";
const q2 = "What's my favourite ice cream?";

invokeWithRunnableSequence(llm, q2)
  .then((result) => console.log("result: ", result))
  .catch((error) => console.log("error: ", error));
