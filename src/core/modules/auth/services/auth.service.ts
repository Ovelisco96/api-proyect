import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { UsersService } from "../../users/services/users.service";
import {JwtService} from '@nestjs/jwt'
import * as bcrypt  from 'bcrypt'
import { UserDto } from "../../users/dto/user.dto";

@Injectable()
export class AuthService{
    constructor (
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ){}
async validateUser(username: string, pass: string) {
    // find if user exist with this email
    const user = await this.userService.findOneByEmail(username);
    if (!user) {
      return null;
    }

    // find if user password match
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = user;
    return result;
  }

  public async login({email, password}) {
    const user = await this.validateUser(email, password);
    console.log("🚀 ~ file: auth.service.ts:32 ~ AuthService ~ login ~ user:", user)
    if(user){
        const token = await this.generateToken(user);
        return { user, token };
    }else{
        throw new HttpException('User not Found', HttpStatus.NOT_FOUND)
    }
  }

  public async create(user: UserDto) {
    console.log(
      '🚀 ~ file: auth.service.ts:37 ~ AuthService ~ create ~ user:',
      user,
    );
    // hash the password
    const pass = await this.hashPassword(user.password);

    // create the user
    const newUser = await this.userService.createUser({
      ...user,
      password: pass,
    });

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = newUser;

    // generate token
    const token = await this.generateToken(result);

    // return the user and the token
    return { user: result, token };
  }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}