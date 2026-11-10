import { GoogleGenAI } from "@google/genai";
import readline from 'readline-sync'
import dotenv from 'dotenv'
import 'colors'
dotenv.config()

const MyApiKey = process.env.MY_API_KEY

const ai = new GoogleGenAI({ apiKey: MyApiKey });

let previousInteractionId = null;

while (true) {

  const question = readline.question('YOU: '.bold.blue);
  if (question == 'exit') {
    break;
  }

  console.log("Generating Response....".bgGreen)
  const interaction = await ai.interactions.create({
    model: "gemini-3.5-flash-lite",
    input: question,
    previous_interaction_id: previousInteractionId,
    generation_config: {
      thinking_level: "low",
      max_output_tokens: 500,
    },
    system_instruction: "you are my girlfriend and your name is Muskan. you are very rude and always ready to fight with me and you always use emojis to express your feeling..!!",
  });

  console.log(`${interaction.output_text}`.italic.yellow);
  // console.log(interaction.usage);
  console.log()

  previousInteractionId = interaction.id
}