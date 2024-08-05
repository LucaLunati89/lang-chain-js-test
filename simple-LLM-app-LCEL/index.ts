import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { openAIApiKey } from "../utils";

const placeholder = {
  language: "language",
  text: "text",
};

const getResponse = async (language: string, text: string) => {
  const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
    openAIApiKey: openAIApiKey,
  });
  const parser = new StringOutputParser();
  const systemTemplate = `Translate the following text: {${placeholder.text}} into {${placeholder.language}}:`;
  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["user", `{${placeholder.text}}`],
  ]);

  const chain = promptTemplate.pipe(model).pipe(parser);

  return await chain.invoke({
    [placeholder.language]: language,
    [placeholder.text]: text,
  });
};

getResponse("Italian", "Hi")
  .then((result) => console.log("result: ", result))
  .catch((error) => console.log("error: ", error));
