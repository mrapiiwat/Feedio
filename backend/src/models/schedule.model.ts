import { z } from "zod";

export const ScheduleSchema = z.object({
  feederID: z.string().min(1, "Please enter the feeder ID"),
  dogId: z.string().min(1, "Please enter the dog ID"),
  foodAmount: z.number().min(1, "Please enter the food amount").positive(),
});
