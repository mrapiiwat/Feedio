import { z } from "zod";

export const DogSchema = z.object({
  Name: z.string().min(1, "Please enter your dog's name"),
  Breed: z.string().min(1, "Please enter the breed"),
  Weight: z.number().positive("Weight must be a positive number"),
  Disease: z.string().optional(),
  Age: z.number().positive("Age must be a positive number"),
  Sex: z.enum(["Male", "Female", "Unknown"]),
});

export enum Sex {
  Male = "Male",
  Female = "Female",
  Unknown = "Unknown",
}
export interface Dog {
  Name: string;
  Breed: string;
  Weight: number;
  Disease?: string;
  Age: number;
  Sex: Sex;
}