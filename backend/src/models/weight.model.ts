import { z } from "zod";

export const WeightSchema = z.object({
  feederID: z.string().min(1, "Feeder ID is required"),
  measuredWeight: z.number().min(1, "Measured weight is required"),
  timestamp: z.string().transform((val) => new Date(val)).optional(),
});
