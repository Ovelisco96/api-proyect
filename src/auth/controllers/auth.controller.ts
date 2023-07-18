import { Body, Controller, Post, Request } from "@nestjs/common";
import { UserDto } from "../../users/dto/user.dto";
import { AuthService } from "../services/auth.service";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @Post('login')
    async login(@Request() req){
        return await this.authService.login(req.body);
    }

    @Post('create')
    async create(@Body() user:UserDto){
        console.log("Entro aquí")
        return await this.authService.create(user);
    }
}