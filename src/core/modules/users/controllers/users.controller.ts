import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { UserDto } from '../dto/user.dto';
import { Users } from '../user.entity';
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers() /* : Promise<User[]> */ {
    return this.userService.findAll();
  }

  @Post()
  createUser(@Body() user: UserDto): Promise<Users> {
    return this.userService.createUser(user);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() changes: UserDto) {
    console.log('BY ID', id);
    return this.userService.update(id, changes);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    console.log(
      '🚀 ~ file: users.controller.ts:36 ~ UsersController ~ remove ~ id:',
      id,
    );

    return this.userService.remove(id);
  }
}
