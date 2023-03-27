
import {forwardRef, Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-role.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {ProfileService} from "./profile.service";
import {ProfileController} from "./profile.controller";
import {User} from "../users/user.model";
import {Profile} from "./profile.model";
import {JwtModule} from "@nestjs/jwt";

@Module({
    controllers: [ProfileController],
    providers: [ProfileService],
    imports: [
        SequelizeModule.forFeature([User, Role, UserRoles, Profile]),// массив моделей
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || "SECRET",
            signOptions: {//время жизни токена
                expiresIn: '24h'
            }
        })
    ],
    exports: [
        ProfileService
    ]
})
export class ProfileModule {}