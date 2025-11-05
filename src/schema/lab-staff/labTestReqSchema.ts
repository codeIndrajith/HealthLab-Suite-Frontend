import { z } from "zod";

export const resultFormSchema = z.object({
  resultValue: z.string().min(1, "Result value is required"),
  resultUnit: z.string().min(1, "Result unit is required"),
  referenceRange: z.string().min(1, "Reference range is required"),
  remarks: z.string().min(1, "Remarks are required"),
});

export type ResultFormSchemaType = z.infer<typeof resultFormSchema>;
