import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { Request as Req } from '../../types/express.type.js';
import { CreateNoteDto } from './dto/create-note.dto.js';
import { UpdateNoteDto } from './dto/update-note.dto.js';
import { NotesService } from './notes.service.js';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  getAll() {
    return this.notesService.getAll();
  }

  @Post()
  create(@Request() { user }: Req, @Body() body: CreateNoteDto) {
    if (!user) throw new InternalServerErrorException();
    return this.notesService.create(body, user);
  }

  @Put()
  update(@Request() { user }: Req, @Body() body: UpdateNoteDto) {
    if (!user) throw new InternalServerErrorException();
    return this.notesService.update(body, user);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Request() { user }: Req) {
    if (!user) throw new InternalServerErrorException();
    return this.notesService.delete(id, user);
  }
}
