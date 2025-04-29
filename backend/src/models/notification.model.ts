import { z } from "zod";

export const NotificationSchema = z.object({
  feederID: z
    .string()
    .uuid("Feeder ID must be a valid UUID")
    .min(1, "Feeder ID is required"),
  dogID: z
    .string()
    .uuid("Dog ID must be a valid UUID")
    .min(1, "Dog ID is required"),
  message: z.string().optional(),
});
