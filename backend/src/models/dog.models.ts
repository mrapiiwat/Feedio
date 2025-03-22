import { z } from "zod";

export const DogSchema = z.object({
  name: z.string().min(1, "Please enter your dog's name"),
  breed: z.string().min(1, "Please enter the breed"),
  weight: z.number().positive("Weight must be a positive number"),
  disease: z.string().optional(),
  age: z.number().positive("Age must be a positive number"),
  sex: z.enum(["Male", "Female", "Unknown"]),
});
