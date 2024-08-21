import { Injectable } from '@nestjs/common';
import { Note } from '@seed-project/models';
import { Collection, Db, ObjectId } from 'mongodb';
import { CreateNoteDto } from './dto/create-note.dto.js';
import { UpdateNoteDto } from './dto/update-note.dto.js';
import { InjectMongoDB } from '../../database/injectDatabase.decorator.js';
import { User } from '../../types/auth.type.js';

@Injectable()
export class NotesService {
  private noteModel: Collection<Omit<Note, '_id'>>;
  constructor(@InjectMongoDB() private readonly db: Db) {
    this.noteModel = this.db.collection('notes');
  }

  async getAll() {
    try {
      const notes = await this.noteModel.find().toArray();
      return notes;
    } catch (e) {
      throw new Error('Error getting notes');
    }
  }

  async create(note: CreateNoteDto, user: User) {
    try {
      const response = await this.noteModel.insertOne({
        content: note.content,
        createdBy: {
          oid: user.userName,
          displayName: user.userName,
        },
        createdAt: new Date(),
      });
      return response.insertedId.toString();
    } catch (e) {
      throw new Error('Error creating note');
    }
  }

  async update(note: UpdateNoteDto, user: User) {
    try {
      const response = await this.noteModel.updateOne(
        { _id: new ObjectId(note._id.toString()), 'createdBy.oid': user.userName },
        {
          $set: { content: note.content },
        },
      );
      return response;
    } catch (e) {
      throw new Error('Error updating note');
    }
  }

  async delete(id: string, user: User) {
    try {
      const response = await this.noteModel.deleteOne({
        _id: new ObjectId(id),
        'createdBy.userName': user.userName,
      });
      return response;
    } catch (e) {
      throw new Error('Error deleting note');
    }
  }
}
