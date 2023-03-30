// этот модуль мы создали командой nest generate module users
//при этом модуль автоматически добавился в файл app.modules

import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./user.model";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-role.model";
import {RolesModule} from "../roles/roles.module";

import {AuthModule} from "../auth/auth.module";
import {Post} from "../posts/posts.model";
import {TokenModule} from "../token/token.module";
import {Token} from "../token/token.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      SequelizeModule.forFeature([User, Role, UserRoles, Post, Token]),// массив моделей
      RolesModule,
      TokenModule,
      forwardRef(() => AuthModule)/* если не использовать форвард,
      то будет круговая зависимость и выдаст ошибку */
  ],
    exports: [
        UsersService,
    ]
})
export class UsersModule {}
