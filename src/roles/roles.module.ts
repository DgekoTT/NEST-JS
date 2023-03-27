//nest generate module roles  создано коммандой

import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/user.model";
import {Role} from "./roles.model";
import {UserRoles} from "./user-role.model";

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports:[SequelizeModule.forFeature([Role, User, UserRoles])],
  exports: [
    RolesService
  ]
})
export class RolesModule {}
