import CustomValidations from "src/utils/general.schema";
import { z } from "zod";

export const NoteSchema = z.object({
  _id: CustomValidations.mongoId,
  content: CustomValidations.text,
  createdBy: z.object({
    _id: CustomValidations.mongoId,
    name: CustomValidations.text,
  }),
  createdAt: CustomValidations.date,
});

export type Note = z.infer<typeof NoteSchema>;
