//nest generate module roles  создано коммандой

import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/user.model";
import {Role} from "./roles.model";
import {UserRoles} from "./user-role.model";
import {JwtModule} from "@nestjs/jwt";

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports:[SequelizeModule.forFeature([Role, User, UserRoles]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "SECRET",
      signOptions: {//время жизни токена
        expiresIn: '24h'
      }
    })
  ],
  exports: [
    RolesService
  ]
})
export class RolesModule {}
