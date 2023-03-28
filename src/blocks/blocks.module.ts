

import { Module } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { BlocksController } from './blocks.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/user.model";

import {Block} from "./blocks.model";
import {FilesModule} from "../files/files.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
  providers: [BlocksService],
  controllers: [BlocksController],
  imports: [SequelizeModule.forFeature([User, Block]),
    FilesModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "SECRET",
      signOptions: {//время жизни токена
        expiresIn: '24h'
      }
    })
  ],
  exports: [
      BlocksService
  ]
})
export class BlocksModule {}
