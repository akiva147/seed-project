import { DateStringSchema, ObjectIdSchema } from "src/utils/zod.utils";
import { z } from "zod";

export const NoteSchema = z.object({
  _id: ObjectIdSchema,
  content: z.string(),
  createdBy: z.object({
    oid: z.string(),
    displayName: z.string(),
  }),
  createdAt: DateStringSchema,
});

export type Note = z.infer<typeof NoteSchema>;
