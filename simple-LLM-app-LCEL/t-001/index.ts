import { ChatOpenAI } from "@langchain/openai";
import { LLM, llm } from "../../utils";
import { messages } from "../utils";

const invokeChatOpenAI = async (llm: LLM) => {
  const chatOpenAI = new ChatOpenAI(llm);
  const result = await chatOpenAI.invoke(messages);
  console.log(result);
};

invokeChatOpenAI(llm);
