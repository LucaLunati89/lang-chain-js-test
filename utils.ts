import { config } from "dotenv";
config();

export const openApiKey = process.env.OPENAI_API_KEY;

export type LLM = {
  model: string;
  temperature: number;
};

export const text = "text";
export const language = "language";

export type SimplePromptInputTranslator = {
  text: string;
  language: string;
};
