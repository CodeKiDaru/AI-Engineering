import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv'
import 'colors'
dotenv.config()

const myApiKey = process.env.MY_API_KEY;

const ai = new GoogleGenAI({apiKey: myApiKey});

console.log("Generating response....".bgGreen)
const response = await ai.interactions.create({
  model: "gemini-3.1-flash-lite",
  input: "who is manas?",
});

console.log(`${response.output_text}`.italic.brightYellow);