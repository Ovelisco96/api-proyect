import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Users } from 'src/core/modules/users/entity/user.entity';
import { UpdateUserDto, UserDto } from '../dto/user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async findAll() /* : Promise<User[]> */ {
    return await this.userRepository.find();
  }

  async findOneByEmail(email: string) {
    const userFound = await this.userRepository.findOne({ where: { email } });
    if (!userFound) {
      throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
    }
    return userFound;
  }

  async findOneById(id: number) {
    const userFound = await this.userRepository.findOne({ where: { id } });
    if (!userFound) {
      throw new NotFoundException('User Not Found');
    }
    return userFound;
  }

  async createUser(user: UserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        name: user.name,
      },
    });
    if (userFound) {
      throw new HttpException('User already exits', HttpStatus.CONFLICT);
    }
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async delete(id: number) {
    const userDelete = await this.userRepository.delete(id);
    if (userDelete.affected == 0) {
      throw new HttpException('User Not Found', HttpStatus.CONFLICT);
    }

    return { userDelete, message: `deleted user with id ${id}` };
  }

  async update(id: number, changes: UpdateUserDto) {
    const userFound = await this.userRepository.findOne({ where: { id } });
    if (Object.keys(changes).length === 0 || null || undefined) {
      throw new HttpException('I do not enter any data', HttpStatus.CONFLICT);
    }
    if (!userFound) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    const updateUser = Object.assign(userFound, changes);
    return await this.userRepository.save(updateUser);
  }
}
