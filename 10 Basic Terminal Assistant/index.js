import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv'
import 'colors'
dotenv.config()

const MyApiKey = process.env.MY_API_KEY

const ai = new GoogleGenAI({ apiKey: MyApiKey });

console.log("Generating Response....".bgGreen)
const interaction = await ai.interactions.create({
  model: "gemini-3.5-flash-lite",
  input: 'hi how are you?',
});

console.log(`${interaction.output_text}`.italic.yellow);
