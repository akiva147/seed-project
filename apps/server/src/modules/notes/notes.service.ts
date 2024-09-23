import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Collection, Db, ObjectId } from 'mongodb';
import { InjectDB } from '../../database/injectDatabase.decorator.js';
import { CreateNoteDto, NoteDocument } from './dto/create-note.dto.js';
import { UpdateNoteDto } from './dto/update-note.dto.js';
import { User } from '@seed-project/models';

@Injectable()
export class NotesService {
  private noteModel: Collection<NoteDocument>;
  constructor(@InjectDB() private readonly db: Db) {
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
          _id: user._id,
          name: user.name,
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
        {
          _id: new ObjectId(note._id),
          'createdBy._id': user._id,
        },
        {
          $set: { content: note.content },
        },
      );
      return response;
    } catch (e) {
      throw new Error('Error updating note');
    }
  }

  async delete(_id: string, user: User) {
    try {
      const note = await this.noteModel.findOne({ _id: new ObjectId(_id) });
      if (!note) throw new Error('Note id not found');
      if (user.role !== 'Admin' && user._id !== note.createdBy._id)
        throw new UnauthorizedException();
      const res = await this.noteModel.deleteOne({ _id: new ObjectId(_id) });
      return res;
    } catch (e) {
      throw new Error('Error deleting note');
    }
  }
}
