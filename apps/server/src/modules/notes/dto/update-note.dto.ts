import { NoteSchema } from '@seed-project/models';
import { createZodDto } from 'nestjs-zod';

export class UpdateNoteDto extends createZodDto(
  NoteSchema.pick({
    content: true,
    _id: true,
  }),
) {}
