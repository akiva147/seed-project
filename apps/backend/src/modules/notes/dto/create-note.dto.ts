import { Note, NoteSchema } from '@seed-project/models';
import { createZodDto } from 'nestjs-zod';

export class CreateNoteDto extends createZodDto(
  NoteSchema.pick({
    content: true,
  }),
) {}

export type NoteDocument = Omit<Note, '_id'> & Document;
