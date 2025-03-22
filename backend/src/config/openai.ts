import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function chatWithAI(prompt: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an expert in dog nutrition" }, // System Role
        { role: "user", content: prompt }, // User Role
      ],
    });

    // Log the response content
    console.log("Response:", response.choices[0]?.message?.content);
    // Return the response content
    return response.choices[0]?.message?.content;
  } catch (error) {
    console.error("Error:", error);
  }
}