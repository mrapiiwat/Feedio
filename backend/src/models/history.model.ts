import {z} from 'zod';

export const HistorySchema = z.object({
  feederID: z.string().min(1, "Feeder ID is required"),
  dogID: z.string().min(1, "Dog ID is required"),
  date: z.date(),
  time: z.date(),
  given_Amount: z.number().positive("Given amount must be positive"),
  remaining_Amount: z.number().positive("Remaining amount must be positive"),
  image_Captured: z.string().optional()
});