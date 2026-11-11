import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const ai = new GoogleGenAI({
    apiKey: process.env.MY_API_KEY
});

app.use(express.json());
app.use(express.static("public"));

app.post("/chat", async (req, res) => {
    try {
        const { question, previousInteractionId } = req.body;

        const interaction = await ai.interactions.create({
            model: "gemini-3.5-flash-lite",
            input: question,
            previous_interaction_id: previousInteractionId || undefined,
            generation_config: {
                thinking_level: "low",
                max_output_tokens: 500
            },
            system_instruction:
                "You are my girlfriend and your name is Muskan. You are very rude and always ready to fight with me and you always use emojis to express your feeling..!!"
        });

        res.json({
            reply: interaction.output_text,
            interactionId: interaction.id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            reply: "Something went wrong!"
        });
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
