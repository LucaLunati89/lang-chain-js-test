import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { LLM, llm } from "../../utils";
import {
  simplePromptInputTranslator,
  SimplePromptInputTranslator,
  promptTemplateTranslator,
} from "../utils";

const invokeChainWithPromptAndParser = async (
  llm: LLM,
  promptInput: SimplePromptInputTranslator
): Promise<string> => {
  const chatOpenAI = new ChatOpenAI(llm);
  const parser = new StringOutputParser();
  const chain = promptTemplateTranslator.pipe(chatOpenAI).pipe(parser);
  return await chain.invoke(promptInput);
};

invokeChainWithPromptAndParser(llm, simplePromptInputTranslator)
  .then((result) => console.log("result: ", result))
  .catch((error) => console.log("error: ", error));
