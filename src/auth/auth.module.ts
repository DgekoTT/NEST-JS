//nest generate module auth создано командой
/*npm i @nestjs/jwt bcryptjs был установлен модуль для работы с
jwt token и шифрование паролей
 */
import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {ProfileModule} from "../profile/profile.module";
import {ProfileService} from "../profile/profile.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
      ProfileModule,
      forwardRef(() => UsersModule) ,/* если не использовать форвард
      то будет кругова зависимость и выдаст ошибку */
      JwtModule.register({
        secret: process.env.PRIVATE_KEY || "SECRET",
          signOptions: {//время жизни токена
            expiresIn: '24h'
          }
      })
  ],
    exports : [
        AuthService,
        JwtModule
    ]
})
export class AuthModule {}
