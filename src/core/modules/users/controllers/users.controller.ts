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
import { UsersService } from '../services/users.service';
import { UserDto } from '../dto/user.dto';
import { Users } from '../entity/user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'obtiene todos los usuarios' })
  getUsers() /* : Promise<User[]> */ {
    console.log('aqui');

    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'obtiene un usuario por id' })
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    console.log('BY ID', id);
    return this.userService.findOneById(id);
  }

  @Post()
  @ApiOperation({ summary: 'crea un usuario' })
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'actualiza un usuario por id' })
  async updateUser(@Param('id') id: number, @Body() changes: UserDto) {
    return this.userService.update(id, changes);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'elimina un usuario por id' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
