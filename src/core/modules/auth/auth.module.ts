import { PassportModule } from "@nestjs/passport";
import { Module } from '@nestjs/common'
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
    imports: [
        PassportModule,
        UsersModule,
        JwtModule.register({
            secret: process.env.JWTKEY,
            signOptions: { expiresIn: process.env.TOKEN_EXPIRATION},
        })
    ],
    providers: [AuthService, JwtStrategy ],
    controllers: [AuthController]
})

export class AuthModule {}