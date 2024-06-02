import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get() // GET /users , query: ?role=x
  findAll(@Query('role') role?: 'intern' | 'admin' | 'engineer') {
    return this.users.findAll(role);
  }

  @Get('interns') // GET /users/interns
  findAllInterns() {
    return this.users.findAll('intern');
  }

  // Note: definition below can't be placed before /interns because 'interns' would be read as id
  @Get(':id') // GET /users/{x}
  findOne(@Param('id') id: string) {
    return this.users.findOne(+id);
  }

  @Post() // POST /users
  create(
    @Body()
    user: {
      name: string;
      email: string;
      role: 'intern' | 'admin' | 'engineer';
    },
  ) {
    return this.users.create(user);
  }

  @Patch(':id') // PATCH /users/{x}
  change(
    @Param('id') id: string,
    @Body()
    payload: {
      name?: string;
      email?: string;
      role?: 'intern' | 'admin' | 'engineer';
    },
  ) {
    return this.users.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.users.delete(+id);
  }
}
