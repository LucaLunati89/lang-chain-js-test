import { config } from "dotenv";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

config();

export const openApiKey = process.env.OPENAI_API_KEY;

export type LLM = {
  model: string;
  temperature: number;
};

export const llm: LLM = {
  model: "gpt-4",
  temperature: 0,
};

export const messages = [
  new HumanMessage({ content: "hi! I'm bob" }),
  new AIMessage({ content: "hi!" }),
  new HumanMessage({ content: "I like vanilla ice cream" }),
  new AIMessage({ content: "nice" }),
  new HumanMessage({ content: "whats 2 + 2" }),
  new AIMessage({ content: "4" }),
  new HumanMessage({ content: "thanks" }),
  new AIMessage({ content: "No problem!" }),
  new HumanMessage({ content: "having fun?" }),
  new AIMessage({ content: "yes!" }),
  new HumanMessage({ content: "That's great!" }),
  new AIMessage({ content: "yes it is!" }),
];
