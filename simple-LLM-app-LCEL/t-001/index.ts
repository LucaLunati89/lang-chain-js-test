import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { openApiKey, LLM } from "../../utils";

openApiKey;

const invokeChatOpenAI = async (
  llm: LLM,
  systemMessage: string,
  humanMessage: string
) => {
  const chatOpenAI = new ChatOpenAI(llm);

  const messages = [
    new SystemMessage(systemMessage),
    new HumanMessage(humanMessage),
  ];

  const result = await chatOpenAI.invoke(messages);

  console.log(result);
};

const llm = {
  model: "gpt-4",
  temperature: 0,
};

const systemMessage = "Translate the following from English into Italian";
const humanMessage = "Hello";

invokeChatOpenAI(llm, systemMessage, humanMessage);
