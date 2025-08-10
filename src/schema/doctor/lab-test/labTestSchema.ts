// labTestSchema.ts
import { z } from "zod";

export const labTestSchema = z
  .object({
    categoryId: z.string(),
    code: z.string(),
    name: z.string(),
    description: z.string(),
    preparationInstructions: z.string(),
    turnaroundTime: z.number().min(1, "turnaroundTime is required"),
    price: z.number().min(1, "Price is required"),
    fasting: z
      .object({
        id: z.boolean(),
        label: z.string(),
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    // Category ID
    if (!data.categoryId || data.categoryId.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Test Category is required",
        path: ["categoryId"],
      });
    }

    // Test Code
    if (!data.code || data.code.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Test Code is required",
        path: ["code"],
      });
    }

    // Test Name
    if (!data.name || data.name.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Test Name is required",
        path: ["name"],
      });
    }

    // Description
    if (!data.description || data.description.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Description is required",
        path: ["description"],
      });
    }

    if (!Number.isInteger(data.turnaroundTime)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Turnaround Time must be an integer",
        path: ["description"],
      });
    }
    if (data.turnaroundTime <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Turnaround Time must be greater than 0",
        path: ["description"],
      });
    }

    // Preparation Instructions
    if (
      !data.preparationInstructions ||
      data.preparationInstructions.trim().length === 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Preparation Instructions are required",
        path: ["preparationInstructions"],
      });
    }

    // Fasting
    if (!data.fasting) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Fasting selection is required",
        path: ["fasting"],
      });
    } else if (typeof data.fasting.id !== "boolean") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Fasting selection is invalid",
        path: ["fasting"],
      });
    }
  });

export type LabTestSchemaType = z.infer<typeof labTestSchema>;
