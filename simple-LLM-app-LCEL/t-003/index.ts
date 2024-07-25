import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { LLM, llm } from "../../utils";
import { messages } from "../utils";

const invokeChain = async (llm: LLM): Promise<string> => {
  const chatOpenAI = new ChatOpenAI(llm);
  const parser = new StringOutputParser();
  const chain = chatOpenAI.pipe(parser);
  return await chain.invoke(messages);
};

invokeChain(llm)
  .then((result) => console.log("result: ", result))
  .catch((error) => console.log("error: ", error));
