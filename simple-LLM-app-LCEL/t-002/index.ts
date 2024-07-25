import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { LLM, llm } from "../../utils";
import { messages } from "../utils";

const invokeChatOpenAIAndParseResult = async (llm: LLM): Promise<string> => {
  const chatOpenAI = new ChatOpenAI(llm);
  const parser = new StringOutputParser();
  const result = await chatOpenAI.invoke(messages);
  return await parser.invoke(result);
};

invokeChatOpenAIAndParseResult(llm)
  .then((result) => console.log("result: ", result))
  .catch((error) => console.log("error: ", error));
