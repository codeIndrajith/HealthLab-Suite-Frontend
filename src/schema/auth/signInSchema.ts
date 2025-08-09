import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .max(50, { message: "Password must be less than 50 characters" }),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;
