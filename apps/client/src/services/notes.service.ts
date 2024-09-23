import { Note, NoteSchema } from '@seed-project/models';
import { authenticatedInstance } from './index.service';

const PREFIX = 'notes';

class NotesService {
    async getAll() {
        try {
            const response = await authenticatedInstance.get<Note[]>(
                `/${PREFIX}`
            );

            const parsed = NoteSchema.array().parse(response.data);

            return parsed;
        } catch (e: any) {
            console.error(e.message);
            throw new Error('Error getting notes');
        }
    }

    async create(content: string) {
        try {
            const response = await authenticatedInstance.post<Note>(
                `/${PREFIX}`,
                { content: content }
            );
            return response.data;
        } catch (e) {
            throw new Error('Error creating note');
        }
    }

    async update(note: Pick<Note, '_id' | 'content'>) {
        try {
            const response = await authenticatedInstance.put(
                `/${PREFIX}`,
                note
            );
            return response.data;
        } catch (e) {
            throw new Error('Error updating note');
        }
    }

    async delete(id: string) {
        try {
            const response = await authenticatedInstance.delete<Note>(
                `/${PREFIX}/${id}`
            );
            return response.data;
        } catch (e) {
            throw new Error('Error deleting note');
        }
    }
}

export const notesService = new NotesService();
