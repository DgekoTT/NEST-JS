import {Module} from "@nestjs/common";
import {TokenService} from "./token.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {Token} from "./token.model";
import {User} from "../users/user.model";
import {JwtModule} from "@nestjs/jwt";

@Module({
    providers: [TokenService],
    imports: [SequelizeModule.forFeature([Token, User]),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || "SECRET",
            signOptions: {//время жизни токена
                expiresIn: '24h'
            }
        })],
    exports: [
        TokenService
    ]
})
 export class TokenModule{}