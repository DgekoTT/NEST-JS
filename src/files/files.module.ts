//nest generate module files

import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Files} from "./files.model";
import {JwtModule} from "@nestjs/jwt";

@Module({
  providers: [FilesService],
  exports: [FilesService],
  imports: [SequelizeModule.forFeature([Files]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "SECRET",
      signOptions: {//время жизни токена
        expiresIn: '24h'
      }
    })
  ]
})
export class FilesModule {}
