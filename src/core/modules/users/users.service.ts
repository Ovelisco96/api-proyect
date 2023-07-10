import { Injectable, Inject } from '@nestjs/common';
import { Users } from 'src/core/modules/users/user.entity';
import { UserDto } from './dto/user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async findAll() /* : Promise<User[]> */ {
    console.log('aquiiii');

    return await this.userRepository.find();
  }

  async findOneByEmail(email: string): Promise<Users> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<Users> {
    return await this.userRepository.findOne({ where: { id } });
  }
  /*  {
    "raw": [],
    "affected": 1
  } */
  async remove(id: number) {
    const userDelete = await this.userRepository.delete(id);
    if (userDelete.affected == 1) {
      return { userDelete, message: `deleted user with id ${id}` };
    } else {
      return { message: `user not found` };
    }
  }

  async createUser(user: UserDto): Promise<Users> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  update(id: number, changes: UserDto) {
    const user = this.userRepository.findOneBy({ id });
    if (!user) {
      // Lanza una excepción o devuelve una respuesta adecuada si el usuario no existe
    }
    const userUpdated = Object.assign(user, changes);
    return userUpdated;
  }
}
