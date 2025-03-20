import { z } from "zod";

export const RecommendationSchema = z.object({
  dogId: z.string().min(1, "Please enter the dog ID")
});