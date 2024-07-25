import { ChatOpenAI } from "@langchain/openai";
import { AIMessage } from "@langchain/core/messages";
import { messages } from "../utils";
import { LLM, llm } from "../../utils";

const invokeChatOpenAI = async (llm: LLM): Promise<AIMessage> => {
  const chatOpenAI = new ChatOpenAI(llm);
  return await chatOpenAI.invoke(messages);
};

invokeChatOpenAI(llm)
  .then((result) => console.log("result: ", result))
  .catch((error) => console.log("error: ", error));
