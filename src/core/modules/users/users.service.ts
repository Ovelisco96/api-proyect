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

  findOne(id: number): Promise<Users> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<Users> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<Users> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async createUser(user: UserDto): Promise<Users> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }
}
