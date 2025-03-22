import { z } from "zod";

export const FeederSchema = z.object({
  food_capa: z.number().positive("Food Capacity must be a positive number"),
  current_food: z.number().positive(),
  status: z.boolean().optional()
})