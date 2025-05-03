import { z } from "zod";

export const ScheduleSchemaUpdate = z.object({
  feederID: z.string().optional(),
  dogID: z.string().optional(),
  foodAmount: z.number().optional(),
  dayType: z.string().optional()
});

export const ScheduleSchema = z.object({
  feederID: z.string().min(1, "Please enter the feeder ID"),
  dogID: z.string().min(1, "Please enter the dog ID"),
  foodAmount: z.number().min(1, "Please enter the food amount"),
  dayType: z.string()
});