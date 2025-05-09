import { z } from "zod";

export const WeightSchema = z.object({
  Feeder_ID: z.string().min(1, "Feeder ID is required"),
  Measured_Weight: z.number().min(0, "Measured weight is required"),
  Timestamp: z.string().transform((val) => new Date(val)).optional(),
});
