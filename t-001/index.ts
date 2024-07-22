import { config } from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

config();
process.env.OPENAI_API_KEY;

type Model = string;
type Temperature = number;

type LLM = {
  model: Model;
  temperature: Temperature;
};

const invokeChat = (chat: LLM, systemMessage: string, humanMessage: string) => {
  const chatOpenAI = new ChatOpenAI(chat);

  const messages = [
    new SystemMessage(systemMessage),
    new HumanMessage(humanMessage),
  ];

  chatOpenAI
    .invoke(messages)
    .then((result) => {
      console.log("result: ", result);
    })
    .catch((error) => {
      console.error("error: ", error);
    });
};

invokeChat(
  {
    model: "gpt-3.5-turbo",
    temperature: 0,
  },
  "Translate the following from English into Italian",
  "Hello"
);
