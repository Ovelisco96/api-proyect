import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './user.entity';
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers() /* : Promise<User[]> */ {
    return this.userService.findAll();
  }

  @Post()
  createUser(@Body() user: Users) /* : Promise<User[]> */ {
    return this.userService.createUser(user);
  }
}
