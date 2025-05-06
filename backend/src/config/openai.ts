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
      max_tokens: 500,
      messages: [
        { role: "system", content: "You are an expert in dog nutrition" },
        { role: "user", content: prompt },
      ],
    });

    console.log("Response:", response.choices[0]?.message?.content);
    return response.choices[0]?.message?.content;
  } catch (error: any) {
    console.error("Initial error:", error);

    if (
      error?.error?.code === "context_length_exceeded" ||
      error?.message?.includes("maximum context length")
    ) {
      console.warn("⚠ Prompt too long, attempting fallback…");

      const shortenedPrompt = prompt.slice(0, Math.floor(prompt.length / 2));

      try {
        const fallbackResponse = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          max_tokens: 500,
          messages: [
            { role: "system", content: "You are an expert in dog nutrition" },
            { role: "user", content: shortenedPrompt },
          ],
        });

        console.log(
          "Fallback Response:",
          fallbackResponse.choices[0]?.message?.content
        );
        return fallbackResponse.choices[0]?.message?.content;
      } catch (fallbackError) {
        console.error("Fallback error:", fallbackError);
        return "Sorry, the AI could not process your request due to input length.";
      }
    }

    return "An unexpected error occurred.";
  }
}
